import { z } from "zod";

export const createUserSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(2, "O nome deve ter pelo menos 2 caracteres."),

    email: z
        .string()
        .trim()
        .email("Email inválido."),

    senha: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres."),
});