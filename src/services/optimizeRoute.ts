export interface RouteDestination {
    destinatario?: string | null;
    rua?: string | null;
    numero?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    complemento?: string | null;
}

export interface RoutePoint {
    ordem: number;
    tipo: "ORIGEM" | "ENTREGA" | "DESTINO_FINAL";
    enderecoFormatado: string;
    destinatario?: string | null;
    latitude: number;
    longitude: number;
}

export interface OptimizedRoute {
    distanciaTotalKm: number;
    custoEstimadoCombustivel: number;
    litrosConsumidos: number;
    resumoRota: string;

    rotaOrdenada: {
        ordem: number;
        tipo: string;
        enderecoFormatado: string;
        destinatario?: string | null;
    }[];
}

export async function optimizeRoute(
    localInicio: string,
    destinoFinal: string,
    valorCombustivel: number,
    kmPorLitro: number,
    entregas: RouteDestination[]
): Promise<OptimizedRoute> {

    const API_URL =
        "http://10.0.2.2:3000/api/optimize-route";

    console.log("🌐 Chamando API:", API_URL);

    const response = await fetch(
        API_URL,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                localInicio,
                destinoFinal,
                valorCombustivel,
                kmPorLitro,
                entregas,
            }),
        }
    );

    console.log(
        "📡 Status da API:",
        response.status
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error ||
            "Erro ao otimizar a rota."
        );
    }

    return data;
}