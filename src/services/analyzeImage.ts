export interface AnalyzedAddress {
    destinatario: string | null;
    rua: string | null;
    numero: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    complemento: string | null;
}

export async function analyzeImage(
    uri: string
): Promise<AnalyzedAddress[]> {
    const formData = new FormData();

    formData.append("image", {
        uri,
        name: "etiqueta.jpg",
        type: "image/jpeg",
    } as any);

    const response = await fetch(
        "http://10.0.2.2:3000/api/analyze-image",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.text();

        console.log(
            "Erro da API:",
            error
        );

        throw new Error(
            "Não foi possível analisar a imagem."
        );
    }

    const data = await response.json();

    return data.routes;
}