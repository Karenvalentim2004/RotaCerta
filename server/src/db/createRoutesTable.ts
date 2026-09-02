import db from "./database";

async function createRoutesTable() {

    await db.execute(`
        CREATE TABLE IF NOT EXISTS rotas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            distancia REAL,

            tempo INTEGER,

            consumo REAL,

            custo REAL,

            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(usuario_id)
            REFERENCES usuarios(id)
        );
    `);

    console.log("✅ Tabela rotas criada");
}

createRoutesTable();