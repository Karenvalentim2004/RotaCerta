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

const deliveriesSchema: Schema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            destinatario: {
                type: Type.STRING,
                nullable: true,
            },
            rua: {
                type: Type.STRING,
                nullable: true,
            },
            numero: {
                type: Type.STRING,
                nullable: true,
            },
            bairro: {
                type: Type.STRING,
                nullable: true,
            },
            cidade: {
                type: Type.STRING,
                nullable: true,
            },
            estado: {
                type: Type.STRING,
                nullable: true,
            },
            complemento: {
                type: Type.STRING,
                nullable: true,
            },
        },
        required: [
            "destinatario",
            "rua",
            "numero",
            "bairro",
            "cidade",
            "estado",
            "complemento",
        ],
    },
};

router.post(
    "/",
    async (request, response) => {
        try {
            const file = request.file;

            if (!file) {
                return response.status(400).json({
                    error: "Nenhuma imagem enviada.",
                });
            }

            const base64Image =
                file.buffer.toString("base64");

            const geminiResponse =
                await ai.models.generateContent({
                    model: "gemini-3.1-flash-lite",
                    contents: [
                        {
                            inlineData: {
                                mimeType:
                                    file.mimetype ||
                                    "image/jpeg",
                                data: base64Image,
                            },
                        },
                        `Analise a imagem enviada e extraia os endereços de entrega.

REGRAS:
- Identifique apenas endereços de destino.
- Não confunda nomes de ruas com destinatários.
- Se uma informação não estiver visível, retorne null.
- Retorne cidade e estado separados.
- Retorne todos os campos definidos no schema.`,
                    ],
                    config: {
                        responseMimeType:
                            "application/json",
                        responseSchema:
                            deliveriesSchema,
                    },
                });

            const responseText =
                geminiResponse.text;

            if (!responseText) {
                throw new Error(
                    "O Gemini não retornou nenhum conteúdo."
                );
            }

            const routes =
                JSON.parse(responseText);

            return response.json({
                routes,
            });

        } catch (error) {
            console.error(
                "❌ Erro ao analisar imagem:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao processar imagem com o Gemini.",
            });
        }
    }
);

export default router;