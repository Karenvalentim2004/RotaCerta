import "dotenv/config";

import { Router } from "express";

import {
    GoogleGenAI,
    Type,
    Schema,
} from "@google/genai";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = Router();


// ==========================================
// GEMINI
// ==========================================

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


// ==========================================
// SCHEMA DOS ENDEREÇOS
// ==========================================

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


// ==========================================
// ANALISAR IMAGEM
// ==========================================

router.post(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            // ==========================================
            // 1. USUÁRIO AUTENTICADO
            // ==========================================

            const usuarioId =
                request.usuarioId;

            if (!usuarioId) {

                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });

            }

            console.log(
                "👤 Usuário autenticado:",
                usuarioId
            );


            // ==========================================
            // 2. PEGAR IMAGEM
            // ==========================================

            const file =
                request.file;

            if (!file) {

                return response.status(400).json({
                    error:
                        "Nenhuma imagem enviada.",
                });

            }


            console.log(
                "📸 Imagem recebida:",
                file.originalname
            );

            console.log(
                "📦 Tamanho:",
                file.size,
                "bytes"
            );


            // ==========================================
            // 3. CONVERTER IMAGEM PARA BASE64
            // ==========================================

            const base64Image =
                file.buffer.toString(
                    "base64"
                );


            // ==========================================
            // 4. ENVIAR PARA O GEMINI
            // ==========================================

            console.log(
                "🤖 Enviando imagem para o Gemini..."
            );

            const geminiResponse =
                await ai.models.generateContent({

                    model:
                        "gemini-3.1-flash-lite",

                    contents: [

                        {
                            inlineData: {

                                mimeType:
                                    file.mimetype ||
                                    "image/jpeg",

                                data:
                                    base64Image,

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


            // ==========================================
            // 5. PEGAR RESPOSTA DO GEMINI
            // ==========================================

            const responseText =
                geminiResponse.text;


            if (!responseText) {

                throw new Error(
                    "O Gemini não retornou nenhum conteúdo."
                );

            }


            console.log(
                "🤖 Resposta recebida do Gemini."
            );


            // ==========================================
            // 6. CONVERTER JSON
            // ==========================================

            const routes =
                JSON.parse(
                    responseText
                );


            console.log(
                "📍 Endereços encontrados:",
                routes.length
            );


            // ==========================================
            // 7. RETORNAR PARA O APP
            // ==========================================

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