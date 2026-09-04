import db from "../db/database";

async function checkRouteColumns() {
    try {
        const result = await db.execute(`
            PRAGMA table_info(rotas)
        `);

        console.log("📋 Colunas da tabela rotas:");

        for (const row of result.rows) {
            console.log(
                `- ${row.name} (${row.type})`
            );
        }

    } catch (error) {
        console.error(
            "❌ Erro ao verificar tabela:",
            error
        );
    }
}

checkRouteColumns();