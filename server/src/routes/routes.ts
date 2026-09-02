import { Router } from "express";

import {
    createRoute,
    getRouteById,
    listRoutesByUser,
} from "../services/routeService";

const router = Router();


// ==========================================
// CRIAR UMA ROTA
// ==========================================

router.post("/", async (request, response) => {

    try {

        const {
            usuarioId,
            origem,
            destinoFinal,
            distanciaTotalKm,
            tempoDeslocamentoMinutos,
            tempoParadasMinutos,
            tempoTotalMinutos,
            litrosConsumidos,
            custoEstimado,
            entregas,
        } = request.body;


        // -------------------------------
        // VALIDAÇÕES
        // -------------------------------

        if (!usuarioId) {
            return response.status(400).json({
                error: "usuarioId é obrigatório.",
            });
        }

        if (!origem) {
            return response.status(400).json({
                error: "origem é obrigatória.",
            });
        }

        if (!destinoFinal) {
            return response.status(400).json({
                error: "destinoFinal é obrigatório.",
            });
        }

        if (!Array.isArray(entregas)) {
            return response.status(400).json({
                error: "entregas deve ser uma lista.",
            });
        }


        // -------------------------------
        // SALVAR
        // -------------------------------

        const rota = await createRoute({

            usuarioId,

            origem,

            destinoFinal,

            distanciaTotalKm,

            tempoDeslocamentoMinutos,

            tempoParadasMinutos,

            tempoTotalMinutos,

            litrosConsumidos,

            custoEstimado,

            entregas,
        });


        return response.status(201).json({
            message: "Rota salva com sucesso!",
            rota,
        });


    } catch (error) {

        console.error(
            "❌ Erro ao criar rota:",
            error
        );

        return response.status(500).json({
            error: "Erro ao salvar rota.",
        });
    }
});


// ==========================================
// BUSCAR UMA ROTA
// ==========================================

router.get("/:id", async (request, response) => {

    try {

        const rotaId =
            Number(request.params.id);

        const usuarioId =
            Number(request.query.usuarioId);


        if (!rotaId || !usuarioId) {
            return response.status(400).json({
                error:
                    "rotaId e usuarioId são obrigatórios.",
            });
        }


        const rota =
            await getRouteById(
                rotaId,
                usuarioId
            );


        if (!rota) {
            return response.status(404).json({
                error: "Rota não encontrada.",
            });
        }


        return response.json(rota);


    } catch (error) {

        console.error(
            "❌ Erro ao buscar rota:",
            error
        );

        return response.status(500).json({
            error: "Erro ao buscar rota.",
        });
    }
});


// ==========================================
// LISTAR HISTÓRICO DO USUÁRIO
// ==========================================

router.get("/", async (request, response) => {

    try {

        const usuarioId =
            Number(request.query.usuarioId);


        if (!usuarioId) {
            return response.status(400).json({
                error:
                    "usuarioId é obrigatório.",
            });
        }


        const rotas =
            await listRoutesByUser(
                usuarioId
            );


        return response.json({
            rotas,
        });


    } catch (error) {

        console.error(
            "❌ Erro ao listar rotas:",
            error
        );

        return response.status(500).json({
            error:
                "Erro ao buscar histórico.",
        });
    }
});


export default router;