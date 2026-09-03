import { Router } from "express";

import { loginUser } from "../services/authService";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = Router();

// =========================
// LOGIN
// =========================

router.post("/login", async (request, response) => {
    try {
        const {
            email,
            senha,
        } = request.body;

        if (!email) {
            return response.status(400).json({
                error: "email é obrigatório.",
            });
        }

        if (!senha) {
            return response.status(400).json({
                error: "senha é obrigatória.",
            });
        }

        const resultado =
            await loginUser(
                email,
                senha
            );

        if (!resultado) {
            return response.status(401).json({
                error:
                    "Email ou senha inválidos.",
            });
        }

        return response.json({
            message: "Login realizado com sucesso!",
            ...resultado,
        });

    } catch (error) {
        console.error(
            "❌ Erro ao realizar login:",
            error
        );

        return response.status(500).json({
            error: "Erro ao realizar login.",
        });
    }
});

router.get(
    "/me",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {
        return response.json({
            message:
                "Token válido!",
            usuarioId:
                request.usuarioId,
        });
    }
);

export default router;