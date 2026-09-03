import "dotenv/config";

import { Router } from "express";

import {
    geocodeAddress,
    optimizeDeliveryOrder,
    getDirections,
} from "../services/orsService";

interface GeocodedDelivery {
    id: number;

    original: any;

    endereco: string;

    latitude: number;

    longitude: number;

    label: string;
}

const router = Router();

// FUNÇÃO PARA MONTAR ENDEREÇO

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

// =========================
// ROTA
// =========================

router.post(
    "/",
    async (request, response) => {

        try {

            const {
                localInicio,
                destinoFinal,
                valorCombustivel,
                kmPorLitro,
                entregas,
            } = request.body;

            // =========================
            // VALIDAÇÕES
            // =========================

            if (
                !localInicio ||
                typeof localInicio !== "string" ||
                !localInicio.trim()
            ) {

                return response.status(400).json({
                    error:
                        "O endereço de origem é obrigatório.",
                });
            }

            if (
                !destinoFinal ||
                typeof destinoFinal !== "string" ||
                !destinoFinal.trim()
            ) {

                return response.status(400).json({
                    error:
                        "O destino final é obrigatório.",
                });
            }

            if (
                !Array.isArray(entregas) ||
                entregas.length === 0
            ) {

                return response.status(400).json({
                    error:
                        "Adicione pelo menos uma entrega.",
                });
            }

            const priceNum =
                Number(valorCombustivel);

            const kmlNum =
                Number(kmPorLitro);

            if (
                !kmlNum ||
                kmlNum <= 0
            ) {

                return response.status(400).json({
                    error:
                        "Consumo do veículo inválido.",
                });
            }

            if (
                !priceNum ||
                priceNum <= 0
            ) {

                return response.status(400).json({
                    error:
                        "Valor do combustível inválido.",
                });
            }

            console.log(
                "🚀 Iniciando otimização ORS..."
            );

            console.log(
                "Origem:",
                localInicio
            );

            console.log(
                "Destino final:",
                destinoFinal
            );

            console.log(
                "Entregas:",
                entregas.length
            );

            // =========================
            // 1. GEOCODIFICAR ORIGEM
            // =========================

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

            // =========================
            // 2. GEOCODIFICAR DESTINO FINAL
            // =========================

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

            // 3. GEOCODIFICAR ENTREGAS

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
                    id: i + 1,

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

            // =========================
            // 4. OTIMIZAR ORDEM
            // =========================

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

            // =========================
            // 5. MONTAR ROTA ORDENADA
            // =========================

            const entregasOrdenadas =
                ordemOtimizada.deliveryIds
                    .map(
                        (id) =>
                            entregasGeocodificadas
                                .find(
                                    (entrega) =>
                                        entrega.id === id
                                )
                    )
                    .filter(Boolean) as typeof entregasGeocodificadas;

            // =========================
            // 6. COORDENADAS DA ROTA
            // =========================

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

            // =========================
            // 7. CALCULAR TRAJETO REAL
            // =========================

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

            // =========================
            // 8. DISTÂNCIA
            // =========================

            const distanciaTotalKm =
                directions.distanciaMetros /
                1000;

            // =========================
            // 9. TEMPO
            // =========================

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

            // =========================
            // 10. COMBUSTÍVEL
            // =========================

            const litrosConsumidos =
                distanciaTotalKm /
                kmlNum;

            const custoEstimadoCombustivel =
                litrosConsumidos *
                priceNum;

            // =========================
            // 11. ROTA ORDENADA
            // =========================

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

            // =========================
            // 12. RESUMO
            // =========================

            const resumoRota =
                `Rota com ${entregas.length} entrega(s), ` +
                `${distanciaTotalKm.toFixed(1)} km de deslocamento ` +
                `e aproximadamente ${tempoTotalMinutos} minutos ` +
                `considerando 5 minutos por parada.`;

            // =========================
            // 13. RESPOSTA
            // =========================

            const resultado = {

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
                "🎉 Rota calculada com sucesso!"
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