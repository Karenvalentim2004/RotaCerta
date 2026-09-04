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


// ==========================================
// CRIAR ROTA
// ==========================================

router.post(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            const usuarioId =
                request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const {
                origem,
                destinoFinal,
                distanciaTotalKm,
                tempoDeslocamentoMinutos,
                tempoParadasMinutos,
                tempoTotalMinutos,
                litrosConsumidos,
                custoEstimado,
                geometria,
                entregas,
            } = request.body;

            const rota =
                await createRoute({

                    usuarioId,

                    origem,

                    destinoFinal,

                    distanciaTotalKm,

                    tempoDeslocamentoMinutos,

                    tempoParadasMinutos,

                    tempoTotalMinutos,

                    litrosConsumidos,

                    custoEstimado,

                    geometria,

                    entregas,
                });

            return response.status(201).json(
                rota
            );

        } catch (error) {

            console.error(
                "❌ Erro ao criar rota:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao criar rota.",
            });
        }
    }
);


// ==========================================
// HISTÓRICO DE ROTAS
// ==========================================

router.get(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {

        try {

            const usuarioId =
                request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const rotas =
                await listRoutesByUser(
                    usuarioId
                );

            return response.json(
                rotas
            );

        } catch (error) {

            console.error(
                "❌ Erro ao listar rotas:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao consultar histórico de rotas.",
            });
        }
    }
);


// ==========================================
// DETALHES DE UMA ROTA
// ==========================================

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
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const rotaId =
                Number(request.params.id);

            if (
                !rotaId ||
                Number.isNaN(rotaId)
            ) {
                return response.status(400).json({
                    error:
                        "ID da rota inválido.",
                });
            }

            const rota =
                await getRouteById(
                    rotaId,
                    usuarioId
                );

            if (!rota) {
                return response.status(404).json({
                    error:
                        "Rota não encontrada.",
                });
            }

            return response.json(
                rota
            );

        } catch (error) {

            console.error(
                "❌ Erro ao consultar rota:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao consultar rota.",
            });
        }
    }
);


export default router;