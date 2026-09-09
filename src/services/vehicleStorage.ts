import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:3000/api";

export interface Vehicle {
    id: number;
    tipo: string;
    modelo: string;
    consumo: number;
    combustivel: string;
}

// =========================
// TOKEN
// =========================

async function getToken() {
    return await AsyncStorage.getItem(
        "@routeapp:token"
    );
}

// =========================
// LISTAR VEÍCULOS
// =========================

export async function getVehicles(): Promise<Vehicle[]> {

    const token = await getToken();

    if (!token) {
        throw new Error(
            "Usuário não autenticado."
        );
    }

    const response = await fetch(
        `${API_URL}/vehicles`,
        {
            method: "GET",

            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error ||
            "Não foi possível carregar os veículos."
        );
    }

    return data.veiculos ?? [];
}

// =========================
// CADASTRAR VEÍCULO
// =========================

export async function createVehicle(
    tipo: string,
    modelo: string,
    consumo: number,
    combustivel: string
): Promise<Vehicle> {

    const token = await getToken();

    if (!token) {
        throw new Error(
            "Usuário não autenticado."
        );
    }

    const response = await fetch(
        `${API_URL}/vehicles`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                tipo,
                modelo,
                consumo,
                combustivel,
            }),
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error ||
            "Não foi possível cadastrar o veículo."
        );
    }

    return data.veiculo;
}

// =========================
// EXCLUIR VEÍCULO
// =========================

export async function deleteVehicle(
    id: number
): Promise<void> {

    const token = await getToken();

    if (!token) {
        throw new Error(
            "Usuário não autenticado."
        );
    }

    const response = await fetch(
        `${API_URL}/vehicles/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data?.error ||
            "Não foi possível excluir o veículo."
        );
    }
}