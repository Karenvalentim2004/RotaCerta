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

    origem: string;
    destinoFinal: string;

    distanciaTotalKm: number;

    tempoDeslocamentoMinutos: number;
    tempoParadasMinutos: number;
    tempoTotalMinutos: number;

    litrosConsumidos: number;
    custoEstimado: number;

    entregas: RouteDelivery[];
}

export async function createRoute(
    data: CreateRouteData
) {
    try {

        // 1. CRIAR A ROTA

        const routeResult = await db.execute({
            sql: `
                INSERT INTO rotas (
                    usuario_id,
                    origem,
                    destino_final,
                    distancia_total_km,
                    tempo_deslocamento_minutos,
                    tempo_paradas_minutos,
                    tempo_total_minutos,
                    litros_consumidos,
                    custo_estimado
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            args: [
                data.usuarioId,
                data.origem,
                data.destinoFinal,
                data.distanciaTotalKm,
                data.tempoDeslocamentoMinutos,
                data.tempoParadasMinutos,
                data.tempoTotalMinutos,
                data.litrosConsumidos,
                data.custoEstimado,
            ],
        });

        const rotaId =
            Number(routeResult.lastInsertRowid);


        // 2. SALVAR AS ENTREGAS

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


        // 3. RETORNAR A ROTA CRIADA

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

//CONSULTAR

export async function getRouteById(
    rotaId: number,
    usuarioId: number
) {

    const routeResult = await db.execute({
        sql: `
            SELECT
                id,
                usuario_id,
                data_rota,
                origem,
                destino_final,
                distancia_total_km,
                tempo_deslocamento_minutos,
                tempo_paradas_minutos,
                tempo_total_minutos,
                litros_consumidos,
                custo_estimado
            FROM rotas
            WHERE id = ?
            AND usuario_id = ?
        `,
        args: [
            rotaId,
            usuarioId,
        ],
    });

    if (routeResult.rows.length === 0) {
        return null;
    }

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

    return {
        rota: routeResult.rows[0],

        entregas: deliveryResult.rows,
    };
}

//HISTORICO DE ROTAS

export async function listRoutesByUser(
    usuarioId: number
) {

    const result = await db.execute({
        sql: `
            SELECT
                id,
                data_rota,
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