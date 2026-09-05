import { Router } from "express";

import {
    createVehicle,
    listVehiclesByUser,
    findVehicleById,
    deleteVehicle,
} from "../services/vehicleService";

import {
    authMiddleware,
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

import { createVehicleSchema } from "../validators/vehicleValidator";

const router = Router();

// CADASTRAR VEÍCULO

router.post(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {
        try {
            const usuarioId = request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error: "Usuário não autenticado.",
                });
            }

            const validacao =
                createVehicleSchema.safeParse(
                    request.body
                );

            if (!validacao.success) {
                return response.status(400).json({
                    error: "Dados do veículo inválidos.",
                    detalhes: validacao.error.issues,
                });
            }

            const {
                tipo,
                modelo,
                consumo,
                combustivel,
            } = validacao.data;

            const veiculoId =
                await createVehicle(
                    usuarioId,
                    tipo,
                    modelo,
                    consumo,
                    combustivel
                );

            return response.status(201).json({
                message:
                    "Veículo cadastrado com sucesso!",
                veiculo: {
                    id: veiculoId,
                    tipo,
                    modelo,
                    consumo,
                    combustivel,
                },
            });

        } catch (error) {
            console.error(
                "❌ Erro ao cadastrar veículo:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao cadastrar veículo.",
            });
        }
    }
);

// LISTAR VEÍCULOS DO USUÁRIO

router.get(
    "/",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {
        try {
            const usuarioId = request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const veiculos =
                await listVehiclesByUser(
                    usuarioId
                );

            return response.json({
                veiculos,
            });

        } catch (error) {
            console.error(
                "❌ Erro ao listar veículos:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao buscar veículos.",
            });
        }
    }
);

// BUSCAR VEÍCULO POR ID

router.get(
    "/:id",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {
        try {
            const usuarioId = request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const veiculoId =
                Number(request.params.id);

            if (
                !Number.isInteger(veiculoId) ||
                veiculoId <= 0
            ) {
                return response.status(400).json({
                    error:
                        "ID do veículo inválido.",
                });
            }

            const veiculo =
                await findVehicleById(
                    veiculoId,
                    usuarioId
                );

            if (!veiculo) {
                return response.status(404).json({
                    error:
                        "Veículo não encontrado.",
                });
            }

            return response.json({
                veiculo,
            });

        } catch (error) {
            console.error(
                "❌ Erro ao buscar veículo:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao buscar veículo.",
            });
        }
    }
);

// EXCLUIR VEÍCULO

router.delete(
    "/:id",
    authMiddleware,
    async (
        request: AuthenticatedRequest,
        response
    ) => {
        try {
            const usuarioId = request.usuarioId;

            if (!usuarioId) {
                return response.status(401).json({
                    error:
                        "Usuário não autenticado.",
                });
            }

            const veiculoId =
                Number(request.params.id);

            if (
                !Number.isInteger(veiculoId) ||
                veiculoId <= 0
            ) {
                return response.status(400).json({
                    error:
                        "ID do veículo inválido.",
                });
            }

            const removido =
                await deleteVehicle(
                    veiculoId,
                    usuarioId
                );

            if (!removido) {
                return response.status(404).json({
                    error:
                        "Veículo não encontrado.",
                });
            }

            return response.json({
                message:
                    "Veículo excluído com sucesso!",
            });

        } catch (error) {
            console.error(
                "❌ Erro ao excluir veículo:",
                error
            );

            return response.status(500).json({
                error:
                    "Erro ao excluir veículo.",
            });
        }
    }
);

export default router;