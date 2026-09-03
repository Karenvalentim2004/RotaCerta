import { z } from "zod";

export const createRouteSchema = z.object({
    origem: z
        .string()
        .trim()
        .min(1, "A origem é obrigatória."),

    destinoFinal: z
        .string()
        .trim()
        .min(1, "O destino final é obrigatório."),

    distanciaTotalKm: z
        .number()
        .nonnegative(
            "A distância não pode ser negativa."
        ),

    tempoDeslocamentoMinutos: z
        .number()
        .int()
        .nonnegative(
            "O tempo de deslocamento não pode ser negativo."
        ),

    tempoParadasMinutos: z
        .number()
        .int()
        .nonnegative(
            "O tempo das paradas não pode ser negativo."
        ),

    tempoTotalMinutos: z
        .number()
        .int()
        .nonnegative(
            "O tempo total não pode ser negativo."
        ),

    litrosConsumidos: z
        .number()
        .nonnegative(
            "Os litros consumidos não podem ser negativos."
        ),

    custoEstimado: z
        .number()
        .nonnegative(
            "O custo não pode ser negativo."
        ),

    entregas: z
        .array(
            z.object({
                ordem: z
                    .number()
                    .int()
                    .positive(),

                destinatario: z
                    .string()
                    .nullable()
                    .optional(),

                rua: z
                    .string()
                    .nullable()
                    .optional(),

                numero: z
                    .string()
                    .nullable()
                    .optional(),

                bairro: z
                    .string()
                    .nullable()
                    .optional(),

                cidade: z
                    .string()
                    .nullable()
                    .optional(),

                estado: z
                    .string()
                    .nullable()
                    .optional(),

                complemento: z
                    .string()
                    .nullable()
                    .optional(),

                latitude: z
                    .number()
                    .nullable()
                    .optional(),

                longitude: z
                    .number()
                    .nullable()
                    .optional(),
            })
        )
        .min(1, "A rota deve possuir pelo menos uma entrega."),
});