import "dotenv/config";

import { Router } from "express";

import {
    GoogleGenAI,
    Type,
    Schema,
} from "@google/genai";

const router = Router();

const apiKey =
    process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY não encontrada no arquivo .env"
    );
}

const ai = new GoogleGenAI({
    apiKey,
});

// SCHEMA DA RESPOSTA

const optimizedRouteSchema: Schema = {
    type: Type.OBJECT,

    properties: {

        distanciaTotalKm: {
            type: Type.NUMBER,
        },

        custoEstimadoCombustivel: {
            type: Type.NUMBER,
        },

        litrosConsumidos: {
            type: Type.NUMBER,
        },

        resumoRota: {
            type: Type.STRING,
        },

        rotaOrdenada: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {

                    ordem: {
                        type: Type.INTEGER,
                    },

                    tipo: {
                        type: Type.STRING,
                    },

                    enderecoFormatado: {
                        type: Type.STRING,
                    },

                    destinatario: {
                        type: Type.STRING,
                        nullable: true,
                    },

                },

                required: [
                    "ordem",
                    "tipo",
                    "enderecoFormatado",
                ],
            },
        },
    },

    required: [
        "distanciaTotalKm",
        "custoEstimadoCombustivel",
        "litrosConsumidos",
        "resumoRota",
        "rotaOrdenada",
    ],
};

// ROTA

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

            // VALIDAÇÕES

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
                !entregas ||
                !Array.isArray(entregas) ||
                entregas.length === 0
            ) {

                return response.status(400).json({
                    error:
                        "Adicione pelo menos um destino.",
                });

            }

            // CONVERTER VALORES

            const priceNum =
                Number(valorCombustivel) || 0;

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

            console.log(
                "🚀 Otimizando rota..."
            );

            console.log(
                "Origem:",
                localInicio
            );

            console.log(
                "Entregas:",
                entregas.length
            );

            // PROMPT PARA O GEMINI

            const prompt = `
Você é um especialista em logística,
roteirização e geolocalização no Brasil.

Sua tarefa é organizar os destinos de uma rota
na sequência mais eficiente possível.

ORIGEM:
${localInicio}

DESTINOS PARA ENTREGA:
${JSON.stringify(entregas, null, 2)}

DESTINO FINAL:
${destinoFinal || "Não informado"}

REGRAS IMPORTANTES:

1. O primeiro item de rotaOrdenada deve ser
a ORIGEM.

2. Organize todas as ENTREGAS em uma ordem
geograficamente eficiente, tentando minimizar
o deslocamento total.

3. Se existir DESTINO FINAL, ele deve ser
o último item da rotaOrdenada.

4. Todos os destinos enviados devem aparecer
na rotaOrdenada.

5. enderecoFormatado deve conter o endereço
completo e legível.

6. Use o contexto geográfico brasileiro.

7. Calcule uma estimativa realista da
distanciaTotalKm em quilômetros.

8. A quantidade de combustível deve seguir:

litrosConsumidos =
distanciaTotalKm / ${kmlNum}

9. O custo estimado deve seguir:

custoEstimadoCombustivel =
litrosConsumidos * ${priceNum}

Retorne apenas os dados no formato JSON
definido pelo schema.
`;

            // GEMINI

            const geminiResponse =
                await ai.models.generateContent({

                    model:
                        "gemini-3.1-flash-lite",

                    contents:
                        prompt,

                    config: {

                        responseMimeType:
                            "application/json",

                        responseSchema:
                            optimizedRouteSchema,

                        temperature:
                            0.1,

                    },

                });

            const responseText =
                geminiResponse.text;

            if (!responseText) {

                throw new Error(
                    "O Gemini não retornou a rota."
                );

            }

            const result =
                JSON.parse(responseText);

            console.log(
                "✅ Rota otimizada com sucesso"
            );

            return response.json(
                result
            );

        } catch (error: any) {

            console.error(
                "❌ Erro ao otimizar rota:",
                error
            );

            if (
                error?.status === 429 ||
                error?.message?.includes(
                    "RESOURCE_EXHAUSTED"
                )
            ) {

                return response.status(429).json({
                    error:
                        "Limite de requisições do Gemini atingido. Aguarde alguns segundos.",
                });

            }

            return response.status(500).json({

                error:
                    "Erro ao calcular rota com o Gemini.",

            });

        }

    }
);

export default router;