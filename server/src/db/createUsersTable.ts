import db from "./database";

async function createUsersTable() {

    await db.execute(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            senha TEXT NOT NULL,

            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log("✅ Tabela usuarios criada");
}

createUsersTable();