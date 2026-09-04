import db from "../db/database";

async function addVehicleToRoutes() {

    try {

        await db.execute(`
            ALTER TABLE rotas
            ADD COLUMN veiculo_id INTEGER
        `);

        console.log(
            "✅ Coluna veiculo_id adicionada à tabela rotas."
        );

    } catch (error) {

        console.error(
            "❌ Erro ao adicionar veiculo_id:",
            error
        );

    }
}

addVehicleToRoutes();