import db from "./database";

async function createStopsTable() {

    await db.execute(`
        CREATE TABLE IF NOT EXISTS paradas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            rota_id INTEGER NOT NULL,

            ordem INTEGER,

            tipo TEXT,

            endereco TEXT,

            destinatario TEXT,

            latitude REAL,

            longitude REAL,

            FOREIGN KEY(rota_id)
            REFERENCES rotas(id)
        );
    `);

    console.log("✅ Tabela paradas criada");
}

createStopsTable();