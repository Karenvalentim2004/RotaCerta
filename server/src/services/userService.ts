import db from "../db/database";

export interface User {
    id: number;
    nome: string;
    email: string;
    senha: string;
    criado_em: string;
}

export async function createUser(
    nome: string,
    email: string,
    senha: string
) {
    const result = await db.execute({
        sql: `
            INSERT INTO usuarios (
                nome,
                email,
                senha
            )
            VALUES (?, ?, ?)
        `,
        args: [
            nome,
            email,
            senha,
        ],
    });

    return Number(result.lastInsertRowid);
}

export async function findUserByEmail(
    email: string
) {
    const result = await db.execute({
        sql: `
            SELECT
                id,
                nome,
                email,
                senha,
                criado_em
            FROM usuarios
            WHERE email = ?
        `,
        args: [email],
    });

    return result.rows[0] ?? null;
}

export async function findUserById(
    id: number
) {
    const result = await db.execute({
        sql: `
            SELECT
                id,
                nome,
                email,
                criado_em
            FROM usuarios
            WHERE id = ?
        `,
        args: [id],
    });

    return result.rows[0] ?? null;
}

export async function listUsers() {
    const result = await db.execute(`
        SELECT
            id,
            nome,
            email,
            criado_em
        FROM usuarios
        ORDER BY id DESC
    `);

    return result.rows;
}