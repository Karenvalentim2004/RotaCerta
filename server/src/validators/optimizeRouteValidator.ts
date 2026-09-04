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

    valorCombustivel: z
        .number()
        .positive(
            "O valor do combustível deve ser maior que zero."
        ),

    kmPorLitro: z
        .number()
        .positive(
            "O consumo deve ser maior que zero."
        ),

    entregas: z
        .array(
            z.object({

                destinatario: z
                    .string()
                    .nullable()
                    .optional(),

                rua: z
                    .string()
                    .trim()
                    .min(
                        1,
                        "A rua da entrega é obrigatória."
                    ),

                numero: z
                    .string()
                    .trim()
                    .min(
                        1,
                        "O número da entrega é obrigatório."
                    ),

                bairro: z
                    .string()
                    .trim()
                    .min(
                        1,
                        "O bairro da entrega é obrigatório."
                    ),

                cidade: z
                    .string()
                    .trim()
                    .min(
                        1,
                        "A cidade da entrega é obrigatória."
                    ),

                estado: z
                    .string()
                    .trim()
                    .min(
                        2,
                        "O estado da entrega é obrigatório."
                    ),

                complemento: z
                    .string()
                    .nullable()
                    .optional(),

            })
        )
        .min(
            1,
            "Adicione pelo menos uma entrega."
        ),
});