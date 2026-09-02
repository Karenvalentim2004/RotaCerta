import db from "./database";

async function createVehiclesTable() {

    await db.execute(`
        CREATE TABLE IF NOT EXISTS veiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            tipo TEXT NOT NULL,

            modelo TEXT NOT NULL,

            consumo REAL NOT NULL,

            combustivel TEXT NOT NULL,

            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(usuario_id)
            REFERENCES usuarios(id)
        );
    `);

    console.log("✅ Tabela veiculos criada");
}

createVehiclesTable();