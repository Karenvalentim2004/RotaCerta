import db from "./database";

async function testDatabase() {
    try {
        const result = await db.execute(
            "SELECT 1 as teste"
        );

        console.log(
            "✅ Turso conectado:",
            result.rows
        );

    } catch (error) {

        console.error(
            "❌ Erro ao conectar no Turso:",
            error
        );

    }
}

testDatabase();