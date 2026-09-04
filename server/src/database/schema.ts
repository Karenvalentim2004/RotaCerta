import db from "../db/database";

async function createDatabase() {
    try {

        // USUÁRIOS

        await db.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                nome TEXT NOT NULL,

                email TEXT NOT NULL UNIQUE,

                senha TEXT NOT NULL,

                criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);


        // VEÍCULOS

        await db.execute(`
            CREATE TABLE IF NOT EXISTS veiculos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                usuario_id INTEGER NOT NULL,

                tipo TEXT NOT NULL,

                modelo TEXT NOT NULL,

                consumo REAL NOT NULL,

                combustivel TEXT NOT NULL,

                criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (usuario_id)
                    REFERENCES usuarios(id)
                    ON DELETE CASCADE
            )
        `);


        // ROTAS

        await db.execute(`
            CREATE TABLE IF NOT EXISTS rotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        data_rota TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        origem TEXT NOT NULL,
        destino_final TEXT NOT NULL,
        distancia_total_km REAL NOT NULL,
        tempo_deslocamento_minutos INTEGER NOT NULL,
        tempo_paradas_minutos INTEGER NOT NULL,
        tempo_total_minutos INTEGER NOT NULL,
        litros_consumidos REAL NOT NULL,
        custo_estimado REAL NOT NULL,
        geometria TEXT,
        FOREIGN KEY (usuario_id)
            REFERENCES usuarios(id)
            ON DELETE CASCADE
    )
`);


        // ENTREGAS

        await db.execute(`
            CREATE TABLE IF NOT EXISTS entregas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                rota_id INTEGER NOT NULL,

                ordem INTEGER NOT NULL,

                destinatario TEXT,

                rua TEXT,

                numero TEXT,

                bairro TEXT,

                cidade TEXT,

                estado TEXT,

                complemento TEXT,

                latitude REAL,

                longitude REAL,

                FOREIGN KEY (rota_id)
                    REFERENCES rotas(id)
                    ON DELETE CASCADE
            )
        `);


        console.log(
            "✅ Banco de dados criado com sucesso!"
        );

    } catch (error) {

        console.error(
            "❌ Erro ao criar banco de dados:",
            error
        );

    }
}

createDatabase();