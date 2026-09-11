import { getAuthHeaders } from "@/services/authService";

// ==========================================
// DESTINO DA ROTA
// ==========================================

export interface RouteDestination {
    destinatario?: string | null;
    rua?: string | null;
    numero?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    complemento?: string | null;
}

// ==========================================
// PONTO DA ROTA
// ==========================================

export interface RoutePoint {
    ordem: number;

    tipo:
        | "ORIGEM"
        | "ENTREGA"
        | "DESTINO_FINAL";

    enderecoFormatado: string;

    destinatario?: string | null;

    latitude: number;

    longitude: number;
}

// ==========================================
// GEOMETRIA DA ROTA
// ==========================================

export interface RouteGeometry {
    type: "LineString";

    coordinates: [number, number][];
}

// ==========================================
// ROTA OTIMIZADA
// ==========================================

export interface OptimizedRoute {
    id?: number;

    veiculoId?: number | string | null;

    distanciaTotalKm: number;

    tempoDeslocamentoMinutos: number;

    tempoParadasMinutos?: number;

    tempoTotalMinutos?: number;

    custoEstimadoCombustivel: number;

    litrosConsumidos: number;

    resumoRota: string;

    rotaOrdenada: RoutePoint[];

    geometria: RouteGeometry;
}

// ==========================================
// OTIMIZAR ROTA
// ==========================================

export async function optimizeRoute(
    localInicio: string,
    destinoFinal: string,
    veiculoId: string | number,
    valorCombustivel: number,
    entregas: RouteDestination[]
): Promise<OptimizedRoute> {

    const API_URL =
        "http://10.0.2.2:3000/api/optimize-route";

    console.log(
        "🌐 Chamando API:",
        API_URL
    );

    console.log(
        "🚗 Veículo enviado:",
        veiculoId
    );

    console.log(
        "⛽ Valor combustível:",
        valorCombustivel
    );

    console.log(
        "📦 Entregas:",
        entregas
    );

    try {

        // ==========================================
        // HEADERS AUTENTICADOS
        // ==========================================

        const headers =
            await getAuthHeaders();

        // ==========================================
        // REQUISIÇÃO
        // ==========================================

        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers,

                    body: JSON.stringify({
                        localInicio,

                        destinoFinal,

                        veiculoId:
                            Number(veiculoId),

                        valorCombustivel,

                        entregas,
                    }),
                }
            );

        console.log(
            "📡 Status da API:",
            response.status
        );

        // ==========================================
        // RESPOSTA
        // ==========================================

        const data =
            await response.json();

        console.log(
            "📦 Resposta da API:",
            data
        );

        // ==========================================
        // ERRO DA API
        // ==========================================

        if (!response.ok) {

            throw new Error(
                data?.error ||
                "Erro ao otimizar a rota."
            );
        }

        // ==========================================
        // VALIDAÇÕES BÁSICAS
        // ==========================================

        if (
            typeof data.distanciaTotalKm !==
            "number"
        ) {
            throw new Error(
                "A API não retornou a distância da rota."
            );
        }

        if (
            typeof data.tempoDeslocamentoMinutos !==
            "number"
        ) {
            throw new Error(
                "A API não retornou o tempo da rota."
            );
        }

        if (
            !data.geometria ||
            !Array.isArray(
                data.geometria.coordinates
            )
        ) {
            throw new Error(
                "A API não retornou a geometria da rota."
            );
        }

        if (
            !Array.isArray(
                data.rotaOrdenada
            )
        ) {
            throw new Error(
                "A API não retornou as paradas da rota."
            );
        }

        // ==========================================
        // RETORNO
        // ==========================================

        return data as OptimizedRoute;

    } catch (error) {

        console.error(
            "❌ Erro no serviço de otimização:",
            error
        );

        throw error;
    }
}