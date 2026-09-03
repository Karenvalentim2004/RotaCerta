import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../db/database";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error(
        "JWT_SECRET não configurado no .env"
    );
}

const JWT_SECRET_STRING: string = JWT_SECRET;

export async function loginUser(
    email: string,
    senha: string
) {
    const result = await db.execute({
        sql: `
            SELECT
                id,
                nome,
                email,
                senha
            FROM usuarios
            WHERE email = ?
        `,
        args: [email],
    });

    if (result.rows.length === 0) {
        return null;
    }

    const usuario = result.rows[0];

    const senhaCorreta =
        await bcrypt.compare(
            senha,
            String(usuario.senha)
        );

    if (!senhaCorreta) {
        return null;
    }

    const token = jwt.sign(
        {
            usuarioId: Number(usuario.id),
            email: String(usuario.email),
        },
        JWT_SECRET_STRING,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        usuario: {
            id: Number(usuario.id),
            nome: String(usuario.nome),
            email: String(usuario.email),
        },
    };
}