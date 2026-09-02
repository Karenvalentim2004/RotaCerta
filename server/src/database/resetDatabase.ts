import db from "../db/database";

async function resetDatabase() {
    try {

        await db.execute(`
            DROP TABLE IF EXISTS entregas
        `);

        await db.execute(`
            DROP TABLE IF EXISTS rotas
        `);

        await db.execute(`
            DROP TABLE IF EXISTS veiculos
        `);

        await db.execute(`
            DROP TABLE IF EXISTS usuarios
        `);

        console.log(
            "🗑️ Tabelas antigas removidas."
        );

    } catch (error) {

        console.error(
            "❌ Erro ao resetar banco:",
            error
        );

    }
}

resetDatabase();