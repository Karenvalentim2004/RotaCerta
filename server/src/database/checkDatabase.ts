import db from "../db/database";

async function checkDatabase() {
    try {
        const result = await db.execute(`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
            ORDER BY name
        `);

        console.log("📋 Tabelas do banco:");

        for (const row of result.rows) {
            console.log(`- ${row.name}`);
        }

    } catch (error) {
        console.error(
            "❌ Erro ao verificar banco:",
            error
        );
    }
}

checkDatabase();