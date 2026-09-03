import { z } from "zod";

export const createVehicleSchema = z.object({
    tipo: z
        .string()
        .trim()
        .min(1, "O tipo do veículo é obrigatório."),

    modelo: z
        .string()
        .trim()
        .min(1, "O modelo do veículo é obrigatório."),

    consumo: z
        .number()
        .positive("O consumo deve ser maior que zero."),

    combustivel: z
        .string()
        .trim()
        .min(1, "O combustível é obrigatório."),
});