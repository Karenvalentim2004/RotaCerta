import { Router } from "express";

import {
    createRoute,
    getRouteById,
    listRoutesByUser,
} from "../services/routeService";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = Router();


// CRIAR UMA ROTA

router.post(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            const {
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

            const usuarioId =
                request.usuarioId;

            // VALIDAÇÕES

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


            // SALVAR

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


// BUSCAR UMA ROTA

router.get(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            const rotaId =
                Number(request.params.id);

            const usuarioId =
                request.usuarioId;

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


// LISTAR HISTÓRICO DO USUÁRIO

router.get(
    "/:id",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            const usuarioId =
                request.usuarioId;


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