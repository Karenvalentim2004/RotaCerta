import { Router } from "express";

import {
    createUser,
    findUserByEmail,
    findUserById,
    listUsers,
} from "../services/userService";

const router = Router();

// =========================
// CADASTRAR USUÁRIO
// =========================

router.post("/", async (request, response) => {
    try {
        const {
            nome,
            email,
            senha,
        } = request.body;

        if (!nome) {
            return response.status(400).json({
                error: "nome é obrigatório.",
            });
        }

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

        const usuarioExistente =
            await findUserByEmail(email);

        if (usuarioExistente) {
            return response.status(409).json({
                error:
                    "Já existe um usuário com esse email.",
            });
        }

        const usuarioId = await createUser(
            nome,
            email,
            senha
        );

        return response.status(201).json({
            message:
                "Usuário cadastrado com sucesso!",
            usuario: {
                id: usuarioId,
                nome,
                email,
            },
        });

    } catch (error) {
        console.error(
            "❌ Erro ao cadastrar usuário:",
            error
        );

        return response.status(500).json({
            error: "Erro ao cadastrar usuário.",
        });
    }
});

// =========================
// LISTAR USUÁRIOS
// =========================

router.get("/", async (_request, response) => {
    try {
        const usuarios = await listUsers();

        return response.json({
            usuarios,
        });

    } catch (error) {
        console.error(
            "❌ Erro ao listar usuários:",
            error
        );

        return response.status(500).json({
            error: "Erro ao buscar usuários.",
        });
    }
});

// =========================
// BUSCAR USUÁRIO POR ID
// =========================

router.get("/:id", async (request, response) => {
    try {
        const usuarioId =
            Number(request.params.id);

        if (!usuarioId) {
            return response.status(400).json({
                error:
                    "ID do usuário é obrigatório.",
            });
        }

        const usuario =
            await findUserById(usuarioId);

        if (!usuario) {
            return response.status(404).json({
                error: "Usuário não encontrado.",
            });
        }

        return response.json({
            usuario,
        });

    } catch (error) {
        console.error(
            "❌ Erro ao buscar usuário:",
            error
        );

        return response.status(500).json({
            error: "Erro ao buscar usuário.",
        });
    }
});

export default router;