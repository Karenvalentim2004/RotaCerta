import {
    getToken,
} from "@/services/authService";


// ==========================================
// ENDEREÇO ANALISADO
// ==========================================

export interface AnalyzedAddress {

    destinatario:
        string | null;

    rua:
        string | null;

    numero:
        string | null;

    bairro:
        string | null;

    cidade:
        string | null;

    estado:
        string | null;

    complemento:
        string | null;
}


// ==========================================
// ANALISAR IMAGEM
// ==========================================

export async function analyzeImage(
    uri: string
): Promise<AnalyzedAddress[]> {

    try {

        console.log(
            "📸 Iniciando análise da imagem..."
        );


        // ==========================================
        // TOKEN
        // ==========================================

        const token =
            await getToken();


        if (!token) {

            throw new Error(
                "Usuário não autenticado."
            );

        }


        // ==========================================
        // FORMDATA
        // ==========================================

        const formData =
            new FormData();


        formData.append(
            "image",
            {
                uri,
                name: "etiqueta.jpg",
                type: "image/jpeg",
            } as any
        );


        // ==========================================
        // ENVIAR PARA API
        // ==========================================

        const response =
            await fetch(
                "http://10.0.2.2:3000/api/analyze-image",
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: formData,
                }
            );


        console.log(
            "📡 Status da API:",
            response.status
        );


        // ==========================================
        // VERIFICAR ERRO
        // ==========================================

        if (!response.ok) {

            const error =
                await response.text();

            console.log(
                "❌ Erro da API:",
                error
            );

            throw new Error(
                "Não foi possível analisar a imagem."
            );
        }


        // ==========================================
        // RESPOSTA
        // ==========================================

        const data =
            await response.json();


        console.log(
            "📦 Resposta da análise:",
            data
        );


        return data.routes;

    } catch (error) {

        console.error(
            "❌ Erro ao analisar imagem:",
            error
        );

        throw error;
    }
}