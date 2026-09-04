import "dotenv/config";

import { Router } from "express";

import {
    geocodeAddress,
    optimizeDeliveryOrder,
    getDirections,
} from "../services/orsService";

import {
    createRoute,
} from "../services/routeService";

import {
    findVehicleById,
} from "../services/vehicleService";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

import {
    optimizeRouteSchema,
} from "../validators/optimizeRouteValidator";


interface GeocodedDelivery {
    id: number;

    original: any;

    endereco: string;

    latitude: number;

    longitude: number;

    label: string;
}


const router = Router();


// ==========================================
// FUNÇÃO PARA MONTAR ENDEREÇO
// ==========================================

function formatDeliveryAddress(
    entrega: any
): string {

    return [
        entrega.rua,
        entrega.numero,
        entrega.bairro,
        entrega.cidade,
        entrega.estado,
        "Brasil",
    ]
        .filter(Boolean)
        .join(", ");
}


// ==========================================
// OTIMIZAR ROTA
// ==========================================

router.post(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            // ==========================================
            // 1. USUÁRIO AUTENTICADO
            // ==========================================

            const usuarioId =
                request.usuarioId;

            if (!usuarioId) {

                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }


            // ==========================================
            // 2. VALIDAR DADOS
            // ==========================================

            const validacao =
                optimizeRouteSchema.safeParse(
                    request.body
                );

            if (!validacao.success) {

                return response.status(400).json({
                    error:
                        "Dados inválidos.",

                    detalhes:
                        validacao.error.issues.map(
                            (erro) => ({
                                campo:
                                    erro.path.join("."),
                                mensagem:
                                    erro.message,
                            })
                        ),
                });
            }


            // ==========================================
            // 3. DADOS VALIDADOS
            // ==========================================

            const {
                localInicio,
                destinoFinal,
                veiculoId,
                valorCombustivel,
                entregas,
            } = validacao.data;


            console.log(
                "🚀 Iniciando otimização ORS..."
            );

            console.log(
                "👤 Usuário:",
                usuarioId
            );

            console.log(
                "🚗 Veículo:",
                veiculoId
            );

            console.log(
                "📍 Origem:",
                localInicio
            );

            console.log(
                "🏁 Destino final:",
                destinoFinal
            );

            console.log(
                "📦 Entregas:",
                entregas.length
            );


            // ==========================================
            // 4. BUSCAR VEÍCULO
            // ==========================================

            console.log(
                "🚗 Buscando veículo..."
            );

            const veiculo =
                await findVehicleById(
                    veiculoId,
                    usuarioId
                );


            if (!veiculo) {

                return response.status(404).json({
                    error:
                        "Veículo não encontrado.",
                });
            }


            const consumoVeiculo =
                Number(
                    veiculo.consumo
                );


            console.log(
                "✅ Veículo encontrado:",
                veiculo.modelo
            );

            console.log(
                "⛽ Consumo:",
                consumoVeiculo,
                "km/L"
            );


            // ==========================================
            // 5. GEOCODIFICAR ORIGEM
            // ==========================================

            console.log(
                "📍 Localizando origem..."
            );

            const origem =
                await geocodeAddress(
                    localInicio
                );


            console.log(
                "✅ Origem:",
                origem
            );


            // ==========================================
            // 6. GEOCODIFICAR DESTINO FINAL
            // ==========================================

            console.log(
                "📍 Localizando destino final..."
            );

            const destino =
                await geocodeAddress(
                    destinoFinal
                );


            console.log(
                "✅ Destino final:",
                destino
            );


            // ==========================================
            // 7. GEOCODIFICAR ENTREGAS
            // ==========================================

            console.log(
                "📍 Localizando entregas..."
            );


            const entregasGeocodificadas:
                GeocodedDelivery[] = [];


            for (
                let i = 0;
                i < entregas.length;
                i++
            ) {

                const entrega =
                    entregas[i];


                const endereco =
                    formatDeliveryAddress(
                        entrega
                    );


                console.log(
                    `📍 Entrega ${i + 1}:`,
                    endereco
                );


                const coordenadas =
                    await geocodeAddress(
                        endereco
                    );


                entregasGeocodificadas.push({

                    id:
                        i + 1,

                    original:
                        entrega,

                    endereco,

                    latitude:
                        coordenadas.latitude,

                    longitude:
                        coordenadas.longitude,

                    label:
                        coordenadas.label,
                });


                console.log(
                    `✅ Entrega ${i + 1} localizada`
                );
            }


            // ==========================================
            // 8. OTIMIZAR ORDEM DAS ENTREGAS
            // ==========================================

            console.log(
                "🧠 Otimizando ordem das entregas..."
            );


            const ordemOtimizada =
                await optimizeDeliveryOrder(

                    [
                        origem.longitude,
                        origem.latitude,
                    ],

                    [
                        destino.longitude,
                        destino.latitude,
                    ],

                    entregasGeocodificadas.map(
                        (entrega) => ({

                            id:
                                entrega.id,

                            coordenadas: [

                                entrega.longitude,
                                entrega.latitude,

                            ],
                        })
                    )
                );


            console.log(
                "✅ Ordem encontrada:",
                ordemOtimizada.deliveryIds
            );


            // ==========================================
            // 9. MONTAR ENTREGAS ORDENADAS
            // ==========================================

            const entregasOrdenadas =
                ordemOtimizada.deliveryIds
                    .map(
                        (id) =>
                            entregasGeocodificadas.find(
                                (entrega) =>
                                    entrega.id === id
                            )
                    )
                    .filter(
                        (
                            entrega
                        ): entrega is GeocodedDelivery =>
                            entrega !== undefined
                    );


            // ==========================================
            // 10. COORDENADAS DA ROTA
            // ==========================================

            const coordenadasRota:
                [number, number][] = [

                    [
                        origem.longitude,
                        origem.latitude,
                    ],

                    ...entregasOrdenadas.map(
                        (entrega) => [

                            entrega.longitude,
                            entrega.latitude,

                        ] as [
                            number,
                            number
                        ]
                    ),

                    [
                        destino.longitude,
                        destino.latitude,
                    ],
                ];


            // ==========================================
            // 11. CALCULAR TRAJETO REAL
            // ==========================================

            console.log(
                "🛣️ Calculando trajeto pelas ruas..."
            );


            const directions =
                await getDirections(
                    coordenadasRota
                );


            console.log(
                "✅ Trajeto calculado"
            );


            // ==========================================
            // 12. DISTÂNCIA
            // ==========================================

            const distanciaTotalKm =
                directions.distanciaMetros /
                1000;


            // ==========================================
            // 13. TEMPO
            // ==========================================

            const tempoDeslocamentoMinutos =
                Math.ceil(
                    directions.duracaoSegundos /
                    60
                );


            // 5 MINUTOS POR ENTREGA

            const tempoParadasMinutos =
                entregas.length * 5;


            const tempoTotalMinutos =
                tempoDeslocamentoMinutos +
                tempoParadasMinutos;


            // ==========================================
            // 14. COMBUSTÍVEL
            // ==========================================

            const litrosConsumidos =
                distanciaTotalKm /
                consumoVeiculo;


            const custoEstimadoCombustivel =
                litrosConsumidos *
                valorCombustivel;


            // ==========================================
            // 15. ROTA ORDENADA
            // ==========================================

            const rotaOrdenada = [

                {
                    ordem: 1,

                    tipo:
                        "ORIGEM",

                    enderecoFormatado:
                        origem.label,

                    latitude:
                        origem.latitude,

                    longitude:
                        origem.longitude,
                },


                ...entregasOrdenadas.map(
                    (
                        entrega,
                        index
                    ) => ({

                        ordem:
                            index + 2,

                        tipo:
                            "ENTREGA",

                        enderecoFormatado:
                            entrega.label,

                        destinatario:
                            entrega.original
                                .destinatario ??
                            null,

                        latitude:
                            entrega.latitude,

                        longitude:
                            entrega.longitude,
                    })
                ),


                {
                    ordem:
                        entregasOrdenadas.length + 2,

                    tipo:
                        "DESTINO_FINAL",

                    enderecoFormatado:
                        destino.label,

                    latitude:
                        destino.latitude,

                    longitude:
                        destino.longitude,
                },
            ];


            // ==========================================
            // 16. RESUMO
            // ==========================================

            const resumoRota =
                `Rota com ${entregas.length} entrega(s), ` +
                `${distanciaTotalKm.toFixed(1)} km de deslocamento ` +
                `e aproximadamente ${tempoTotalMinutos} minutos ` +
                `considerando 5 minutos por parada.`;


            // ==========================================
            // 17. PREPARAR ENTREGAS PARA O BANCO
            // ==========================================

            const entregasParaSalvar =
                entregasOrdenadas.map(
                    (
                        entrega,
                        index
                    ) => ({

                        ordem:
                            index + 1,

                        destinatario:
                            entrega.original
                                .destinatario ??
                            null,

                        rua:
                            entrega.original
                                .rua ??
                            null,

                        numero:
                            entrega.original
                                .numero ??
                            null,

                        bairro:
                            entrega.original
                                .bairro ??
                            null,

                        cidade:
                            entrega.original
                                .cidade ??
                            null,

                        estado:
                            entrega.original
                                .estado ??
                            null,

                        complemento:
                            entrega.original
                                .complemento ??
                            null,

                        latitude:
                            entrega.latitude,

                        longitude:
                            entrega.longitude,
                    })
                );


            // ==========================================
            // 18. SALVAR NO TURSO
            // ==========================================

            console.log(
                "💾 Salvando rota no Turso..."
            );


            const rotaSalva =
                await createRoute({

                    usuarioId,

                    veiculoId,

                    origem:
                        localInicio,

                    destinoFinal,

                    distanciaTotalKm:
                        Number(
                            distanciaTotalKm.toFixed(2)
                        ),

                    tempoDeslocamentoMinutos,

                    tempoParadasMinutos,

                    tempoTotalMinutos,

                    litrosConsumidos:
                        Number(
                            litrosConsumidos.toFixed(2)
                        ),

                    custoEstimado:
                        Number(
                            custoEstimadoCombustivel
                                .toFixed(2)
                        ),

                    geometria:
                        directions.geometria,

                    entregas:
                        entregasParaSalvar,
                });


            console.log(
                "✅ Rota salva no Turso:",
                rotaSalva.id
            );


            // ==========================================
            // 19. RESULTADO
            // ==========================================

            const resultado = {

                id:
                    rotaSalva.id,

                veiculoId,

                distanciaTotalKm:
                    Number(
                        distanciaTotalKm.toFixed(2)
                    ),

                tempoDeslocamentoMinutos,

                tempoParadasMinutos,

                tempoTotalMinutos,

                custoEstimadoCombustivel:
                    Number(
                        custoEstimadoCombustivel
                            .toFixed(2)
                    ),

                litrosConsumidos:
                    Number(
                        litrosConsumidos
                            .toFixed(2)
                    ),

                resumoRota,

                rotaOrdenada,

                geometria:
                    directions.geometria,
            };


            console.log(
                "🎉 Rota calculada e salva com sucesso!"
            );


            return response.json(
                resultado
            );


        } catch (error: any) {

            console.error(
                "❌ Erro ao otimizar rota:",
                error
            );


            return response.status(500).json({

                error:
                    error?.message ||
                    "Erro ao calcular a rota.",

            });
        }
    }
);


export default router;