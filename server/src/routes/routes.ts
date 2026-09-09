import { Router } from "express";

import {
    getRouteById,
    listRoutesByUser,
    deleteRoute,
} from "../services/routeService";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = Router();


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
                Number(
                    request.params.id
                );


            if (
                !Number.isInteger(rotaId) ||
                rotaId <= 0
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


// ==========================================
// EXCLUIR ROTA
// ==========================================

router.delete(
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
                Number(
                    request.params.id
                );


            if (
                !Number.isInteger(rotaId) ||
                rotaId <= 0
            ) {

                return response.status(400).json({
                    error:
                        "ID da rota inválido.",
                });

            }


            const removida =
                await deleteRoute(
                    rotaId,
                    usuarioId
                );


            if (!removida) {

                return response.status(404).json({
                    error:
                        "Rota não encontrada ou não pertence ao usuário.",
                });

            }


            return response.json({
                message:
                    "Rota excluída com sucesso!",
            });

        } catch (error) {

            console.error(
                "❌ Erro ao excluir rota:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao excluir rota.",
            });

        }

    }
);

export default router;