import { z } from "zod";

export const optimizeRouteSchema = z.object({
    localInicio: z
        .string()
        .trim()
        .min(
            1,
            "O endereço de origem é obrigatório."
        ),

    destinoFinal: z
        .string()
        .trim()
        .min(
            1,
            "O destino final é obrigatório."
        ),

    veiculoId: z
        .number()
        .int()
        .positive(
            "O veículo selecionado é inválido."
        ),

    valorCombustivel: z
        .number()
        .positive(
            "O valor do combustível deve ser maior que zero."
        ),

    entregas: z
        .array(
            z.object({
                destinatario:
                    z.string().nullable().optional(),

                rua:
                    z.string().nullable().optional(),

                numero:
                    z.string().nullable().optional(),

                bairro:
                    z.string().nullable().optional(),

                cidade:
                    z.string().nullable().optional(),

                estado:
                    z.string().nullable().optional(),

                complemento:
                    z.string().nullable().optional(),
            })
        )
        .min(
            1,
            "A rota deve possuir pelo menos uma entrega."
        ),
});