import db from "../db/database";

export async function createVehicle(
    usuarioId: number,
    tipo: string,
    modelo: string,
    consumo: number,
    combustivel: string
) {
    const result = await db.execute({
        sql: `
            INSERT INTO veiculos (
                usuario_id,
                tipo,
                modelo,
                consumo,
                combustivel
            )
            VALUES (?, ?, ?, ?, ?)
        `,
        args: [
            usuarioId,
            tipo,
            modelo,
            consumo,
            combustivel,
        ],
    });

    return Number(result.lastInsertRowid);
}

export async function listVehiclesByUser(
    usuarioId: number
) {
    const result = await db.execute({
        sql: `
            SELECT
                id,
                usuario_id,
                tipo,
                modelo,
                consumo,
                combustivel,
                criado_em
            FROM veiculos
            WHERE usuario_id = ?
            ORDER BY id DESC
        `,
        args: [usuarioId],
    });

    return result.rows;
}

export async function findVehicleById(
    id: number
) {
    const result = await db.execute({
        sql: `
            SELECT
                id,
                usuario_id,
                tipo,
                modelo,
                consumo,
                combustivel,
                criado_em
            FROM veiculos
            WHERE id = ?
        `,
        args: [id],
    });

    return result.rows[0] ?? null;
}

export async function deleteVehicle(
    id: number,
    usuarioId: number
) {
    const result = await db.execute({
        sql: `
            DELETE FROM veiculos
            WHERE id = ?
            AND usuario_id = ?
        `,
        args: [
            id,
            usuarioId,
        ],
    });

    return result.rowsAffected > 0;
}