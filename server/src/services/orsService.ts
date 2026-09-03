import "dotenv/config";

const ORS_API_KEY = process.env.ORS_API_KEY;
const ORS_BASE_URL = process.env.ORS_BASE_URL;

if (!ORS_API_KEY) {
    throw new Error(
        "ORS_API_KEY não configurada no .env"
    );
}

if (!ORS_BASE_URL) {
    throw new Error(
        "ORS_BASE_URL não configurada no .env"
    );
}

const ORS_API_KEY_STRING: string =
    ORS_API_KEY;

const ORS_BASE_URL_STRING: string =
    ORS_BASE_URL;

// TIPOS

export interface GeocodedLocation {
    latitude: number;
    longitude: number;
    label: string;
}

export interface OptimizedOrder {
    deliveryIds: number[];
}

export interface DirectionsResult {
    distanciaMetros: number;
    duracaoSegundos: number;
    geometria: any;
}

// GEOCODING

export async function geocodeAddress(
    endereco: string
): Promise<GeocodedLocation> {

    const url =
        `${ORS_BASE_URL_STRING}/pelias/v1/search` +
        `?text=${encodeURIComponent(endereco)}` +
        `&size=1` +
        `&boundary.country=BR`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: ORS_API_KEY_STRING,
        },
    });

    if (!response.ok) {

        const error =
            await response.text();

        console.error(
            "❌ Erro ORS Geocoding:",
            error
        );

        throw new Error(
            `Não foi possível localizar o endereço: ${endereco}`
        );
    }

    const data =
        await response.json();

    if (
        !data.features ||
        data.features.length === 0
    ) {
        throw new Error(
            `Endereço não encontrado: ${endereco}`
        );
    }

    const feature =
        data.features[0];

    const [
        longitude,
        latitude,
    ] = feature.geometry.coordinates;

    return {
        latitude,
        longitude,
        label:
            feature.properties?.label ||
            endereco,
    };
}

// OTIMIZAÇÃO

export async function optimizeDeliveryOrder(
    origem: [number, number],
    destinoFinal: [number, number],
    entregas: {
        id: number;
        coordenadas: [number, number];
    }[]
): Promise<OptimizedOrder> {

    const requestBody = {
        vehicles: [
            {
                id: 1,

                start: origem,

                end: destinoFinal,
            },
        ],

        jobs: entregas.map(
            (entrega) => ({
                id: entrega.id,

                location:
                    entrega.coordenadas,
            })
        ),
    };

    const response = await fetch(
        `${ORS_BASE_URL_STRING}/vroom/v0`,
        {
            method: "POST",

            headers: {
                Authorization:
                    ORS_API_KEY_STRING,

                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify(
                requestBody
            ),
        }
    );

    if (!response.ok) {

        const error =
            await response.text();

        console.error(
            "❌ Erro ORS Optimization:",
            error
        );

        throw new Error(
            "Não foi possível otimizar a ordem das entregas."
        );
    }

    const data =
        await response.json();

    if (
        !data.routes ||
        data.routes.length === 0
    ) {
        throw new Error(
            "O ORS não retornou uma rota otimizada."
        );
    }

    const steps =
        data.routes[0].steps;

    const deliveryIds =
        steps
            .filter(
                (step: any) =>
                    step.type === "job"
            )
            .map(
                (step: any) =>
                    Number(step.job)
            );

    return {
        deliveryIds,
    };
}

// DIRECTIONS

export async function getDirections(
    coordenadas: [number, number][]
): Promise<DirectionsResult> {

    const response = await fetch(
        `${ORS_BASE_URL_STRING}/openrouteservice/v2/directions/driving-car/geojson`,
        {
            method: "POST",

            headers: {
                Authorization:
                    ORS_API_KEY_STRING,

                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                coordinates:
                    coordenadas,

                instructions:
                    false,
            }),
        }
    );

    if (!response.ok) {

        const error =
            await response.text();

        console.error(
            "❌ Erro ORS Directions:",
            error
        );

        throw new Error(
            "Não foi possível calcular o trajeto."
        );
    }

    const data =
        await response.json();

    if (
        !data.features ||
        data.features.length === 0
    ) {
        throw new Error(
            "O ORS não retornou a geometria da rota."
        );
    }

    const feature =
        data.features[0];

    return {
        distanciaMetros:
            Number(
                feature.properties
                    ?.summary
                    ?.distance
            ),

        duracaoSegundos:
            Number(
                feature.properties
                    ?.summary
                    ?.duration
            ),

        geometria:
            feature.geometry,
    };
}