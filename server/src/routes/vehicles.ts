import { Router } from "express";

import {
    createVehicle,
    listVehiclesByUser,
    findVehicleById,
    deleteVehicle,
} from "../services/vehicleService";

const router = Router();

// =========================
// CADASTRAR VEÍCULO
// =========================

router.post("/", async (request, response) => {
    try {
        const {
            usuarioId,
            tipo,
            modelo,
            consumo,
            combustivel,
        } = request.body;

        if (!usuarioId) {
            return response.status(400).json({
                error: "usuarioId é obrigatório.",
            });
        }

        if (!tipo) {
            return response.status(400).json({
                error: "tipo é obrigatório.",
            });
        }

        if (!modelo) {
            return response.status(400).json({
                error: "modelo é obrigatório.",
            });
        }

        if (consumo === undefined || consumo === null) {
            return response.status(400).json({
                error: "consumo é obrigatório.",
            });
        }

        if (!combustivel) {
            return response.status(400).json({
                error: "combustivel é obrigatório.",
            });
        }

        const veiculoId = await createVehicle(
            Number(usuarioId),
            tipo,
            modelo,
            Number(consumo),
            combustivel
        );

        return response.status(201).json({
            message: "Veículo cadastrado com sucesso!",
            veiculo: {
                id: veiculoId,
                usuarioId: Number(usuarioId),
                tipo,
                modelo,
                consumo: Number(consumo),
                combustivel,
            },
        });

    } catch (error) {
        console.error(
            "❌ Erro ao cadastrar veículo:",
            error
        );

        return response.status(500).json({
            error: "Erro ao cadastrar veículo.",
        });
    }
});

// =========================
// LISTAR VEÍCULOS DO USUÁRIO
// =========================

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

        const veiculos =
            await listVehiclesByUser(usuarioId);

        return response.json({
            veiculos,
        });

    } catch (error) {
        console.error(
            "❌ Erro ao listar veículos:",
            error
        );

        return response.status(500).json({
            error: "Erro ao buscar veículos.",
        });
    }
});

// =========================
// BUSCAR VEÍCULO POR ID
// =========================

router.get("/:id", async (request, response) => {
    try {
        const veiculoId =
            Number(request.params.id);

        if (!veiculoId) {
            return response.status(400).json({
                error: "ID do veículo é obrigatório.",
            });
        }

        const veiculo =
            await findVehicleById(veiculoId);

        if (!veiculo) {
            return response.status(404).json({
                error: "Veículo não encontrado.",
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
            error: "Erro ao buscar veículo.",
        });
    }
});

// =========================
// EXCLUIR VEÍCULO
// =========================

router.delete("/:id", async (request, response) => {
    try {
        const veiculoId =
            Number(request.params.id);

        const usuarioId =
            Number(request.query.usuarioId);

        if (!veiculoId) {
            return response.status(400).json({
                error: "ID do veículo é obrigatório.",
            });
        }

        if (!usuarioId) {
            return response.status(400).json({
                error:
                    "usuarioId é obrigatório.",
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
                    "Veículo não encontrado ou não pertence ao usuário.",
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
            error: "Erro ao excluir veículo.",
        });
    }
});

export default router;