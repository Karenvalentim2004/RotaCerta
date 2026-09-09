import {
    getAuthHeaders,
} from "@/services/authService";


export interface Vehicle {
    id: number;
    usuario_id?: number;
    tipo: string;
    modelo: string;
    consumo: number;
    combustivel: string;
    criado_em?: string;
}


const API_URL =
    "http://10.0.2.2:3000/api/vehicles";


// ==========================================
// BUSCAR VEÍCULOS
// ==========================================

export async function getVehicles(): Promise<Vehicle[]> {

    const headers =
        await getAuthHeaders();


    const response =
        await fetch(
            API_URL,
            {
                method: "GET",
                headers,
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data?.error ||
            "Erro ao buscar veículos."
        );

    }


    return data.veiculos;

}


// ==========================================
// CRIAR VEÍCULO
// ==========================================

export async function createVehicle(
    tipo: string,
    modelo: string,
    consumo: number,
    combustivel: string
): Promise<Vehicle> {

    const headers =
        await getAuthHeaders();


    const response =
        await fetch(
            API_URL,
            {
                method: "POST",

                headers,

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
            "Erro ao cadastrar veículo."
        );

    }


    return data.veiculo;

}


// ==========================================
// ATUALIZAR VEÍCULO
// ==========================================

export async function updateVehicle(
    id: number,
    tipo: string,
    modelo: string,
    consumo: number,
    combustivel: string
): Promise<Vehicle> {

    const headers =
        await getAuthHeaders();


    const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers,

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
            "Erro ao atualizar veículo."
        );

    }


    return data.veiculo;

}


// ==========================================
// EXCLUIR VEÍCULO
// ==========================================

export async function deleteVehicle(
    id: number
): Promise<void> {

    const headers =
        await getAuthHeaders();


    const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE",

                headers,
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data?.error ||
            "Erro ao excluir veículo."
        );

    }

}