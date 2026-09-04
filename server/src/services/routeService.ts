import db from "../db/database";

export interface RouteDelivery {
    ordem: number;
    destinatario?: string | null;

    rua?: string | null;
    numero?: string | null;
    bairro?: string | null;
    cidade?: string | null;
    estado?: string | null;
    complemento?: string | null;

    latitude?: number | null;
    longitude?: number | null;
}

export interface CreateRouteData {
    usuarioId: number;

    veiculoId: number;

    origem: string;
    destinoFinal: string;

    distanciaTotalKm: number;

    tempoDeslocamentoMinutos: number;
    tempoParadasMinutos: number;
    tempoTotalMinutos: number;

    litrosConsumidos: number;
    custoEstimado: number;

    geometria: any;

    entregas: RouteDelivery[];
}


// ==========================================
// CRIAR ROTA
// ==========================================

export async function createRoute(
    data: CreateRouteData
) {
    try {

        // 1. CRIAR A ROTA

        const routeResult = await db.execute({
            sql: `
                INSERT INTO rotas (
                    usuario_id,
                    veiculo_id,
                    origem,
                    destino_final,
                    distancia_total_km,
                    tempo_deslocamento_minutos,
                    tempo_paradas_minutos,
                    tempo_total_minutos,
                    litros_consumidos,
                    custo_estimado,
                    geometria
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            args: [
                data.usuarioId,
                data.veiculoId,
                data.origem,
                data.destinoFinal,
                data.distanciaTotalKm,
                data.tempoDeslocamentoMinutos,
                data.tempoParadasMinutos,
                data.tempoTotalMinutos,
                data.litrosConsumidos,
                data.custoEstimado,
                JSON.stringify(data.geometria),
            ],
        });

        const rotaId =
            Number(routeResult.lastInsertRowid);


        // ==========================================
        // 2. SALVAR AS ENTREGAS
        // ==========================================

        for (const entrega of data.entregas) {

            await db.execute({
                sql: `
                    INSERT INTO entregas (
                        rota_id,
                        ordem,
                        destinatario,
                        rua,
                        numero,
                        bairro,
                        cidade,
                        estado,
                        complemento,
                        latitude,
                        longitude
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                args: [
                    rotaId,
                    entrega.ordem,
                    entrega.destinatario ?? null,
                    entrega.rua ?? null,
                    entrega.numero ?? null,
                    entrega.bairro ?? null,
                    entrega.cidade ?? null,
                    entrega.estado ?? null,
                    entrega.complemento ?? null,
                    entrega.latitude ?? null,
                    entrega.longitude ?? null,
                ],
            });

        }


        // ==========================================
        // 3. RETORNAR A ROTA CRIADA
        // ==========================================

        return {
            id: rotaId,
            ...data,
        };

    } catch (error) {

        console.error(
            "❌ Erro ao salvar rota:",
            error
        );

        throw error;
    }
}


// ==========================================
// CONSULTAR UMA ROTA
// ==========================================

export async function getRouteById(
    rotaId: number,
    usuarioId: number
) {

    const routeResult = await db.execute({
        sql: `
            SELECT
                id,
                usuario_id,
                veiculo_id,
                data_rota,
                origem,
                destino_final,
                distancia_total_km,
                tempo_deslocamento_minutos,
                tempo_paradas_minutos,
                tempo_total_minutos,
                litros_consumidos,
                custo_estimado,
                geometria
            FROM rotas
            WHERE id = ?
            AND usuario_id = ?
        `,
        args: [
            rotaId,
            usuarioId,
        ],
    });


    // ==========================================
    // ROTA NÃO ENCONTRADA
    // ==========================================

    if (routeResult.rows.length === 0) {
        return null;
    }


    // ==========================================
    // PEGAR ROTA
    // ==========================================

    const rota =
        routeResult.rows[0];


    // ==========================================
    // CONVERTER GEOMETRIA
    // ==========================================

    let geometria = null;

    if (rota.geometria) {

        try {

            geometria =
                JSON.parse(
                    String(rota.geometria)
                );

        } catch (error) {

            console.error(
                "❌ Erro ao interpretar geometria:",
                error
            );

        }
    }


    // ==========================================
    // BUSCAR ENTREGAS DA ROTA
    // ==========================================

    const deliveryResult = await db.execute({
        sql: `
            SELECT
                id,
                rota_id,
                ordem,
                destinatario,
                rua,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude
            FROM entregas
            WHERE rota_id = ?
            ORDER BY ordem ASC
        `,
        args: [rotaId],
    });


    // ==========================================
    // RETORNAR ROTA + ENTREGAS
    // ==========================================

    return {
        rota: {
            ...rota,
            geometria,
        },

        entregas:
            deliveryResult.rows,
    };
}


// ==========================================
// HISTÓRICO DE ROTAS
// ==========================================

export async function listRoutesByUser(
    usuarioId: number
) {

    const result = await db.execute({
        sql: `
            SELECT
                id,
                data_rota,
                veiculo_id,
                origem,
                destino_final,
                distancia_total_km,
                tempo_total_minutos,
                litros_consumidos,
                custo_estimado
            FROM rotas
            WHERE usuario_id = ?
            ORDER BY data_rota DESC
        `,
        args: [usuarioId],
    });

    return result.rows;
}