import db from "../db/database";

async function resetUsers() {
    try {
        await db.execute(`
            DELETE FROM usuarios
        `);

        console.log(
            "🗑️ Usuários de teste removidos."
        );
    } catch (error) {
        console.error(
            "❌ Erro ao remover usuários:",
            error
        );
    }
}

resetUsers();