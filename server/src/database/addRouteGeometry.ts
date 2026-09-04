import db from "../db/database";

async function addRouteGeometry() {
    try {
        await db.execute(`
            ALTER TABLE rotas
            ADD COLUMN geometria TEXT
        `);

        console.log(
            "✅ Coluna geometria adicionada à tabela rotas."
        );

    } catch (error) {
        console.error(
            "❌ Erro ao adicionar geometria:",
            error
        );
    }
}

addRouteGeometry();