import { Router } from "express";

import {
    createUser,
    findUserByEmail,
    findUserById,
    listUsers,
} from "../services/userService";

import {
    createUserSchema,
} from "../validators/userValidator";

const router = Router();

// CADASTRAR USUÁRIO

router.post("/", async (request, response) => {
    try {
        const resultado =
            createUserSchema.safeParse(
                request.body
            );

        if (!resultado.success) {
            return response.status(400).json({
                error: "Dados inválidos.",
                detalhes: resultado.error.issues,
            });
        }

        const {
            nome,
            email,
            senha,
        } = resultado.data;

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

    } catch (error: any) {

        console.error(
            "❌ Erro ao criar usuário:",
            error
        );


        if (
            error?.message ===
            "EMAIL_ALREADY_EXISTS"
        ) {

            return response.status(409).json({
                error:
                    "Este email já está cadastrado.",
            });
        }


        return response.status(500).json({
            error:
                "Erro ao criar usuário.",
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