import "dotenv/config";

// ==========================================
// CONFIGURAÇÃO
// ==========================================

const ORS_API_KEY = process.env.ORS_API_KEY;
const ORS_BASE_URL = process.env.ORS_BASE_URL;

if (!ORS_API_KEY) {
    throw new Error("ORS_API_KEY não configurada no .env");
}

if (!ORS_BASE_URL) {
    throw new Error("ORS_BASE_URL não configurada no .env");
}

// ==========================================
// TIPOS
// ==========================================

export interface GeocodedLocation {
    latitude: number;
    longitude: number;
    label: string;
}

export interface OptimizedOrder {
    deliveryIds: number[];
}

export interface DirectionsResult {
    distanciaMetros: number;
    duracaoSegundos: number;
    geometria: GeoJSONLineString;
}

interface GeoJSONLineString {
    type: "LineString";
    coordinates: [number, number][];
}

interface PeliasFeature {
    geometry?: {
        coordinates?: number[];
    };

    properties?: {
        label?: string;
        name?: string;
        street?: string;
        housenumber?: string | number;
        locality?: string;
        localadmin?: string;
        county?: string;
        region?: string;
        country?: string;
        country_a?: string;
    };
}

interface PeliasResponse {
    features?: PeliasFeature[];
}

interface GeocodingCandidate {
    feature: PeliasFeature;
    score: number;
}

// FUNÇÕES AUXILIARES

function normalizarTexto(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\bav\b|\bav\.\b/g, "avenida")
        .replace(/\br\b|\br\.\b/g, "rua")
        .replace(/\bal\b|\bal\.\b/g, "alameda")
        .replace(/\bdr\b|\bdr\.\b/g, "doutor")
        .replace(/['"`´]/g, "")
        .replace(/[.,;:/\\()-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizarCidade(cidade: string): string {
    const limpo = normalizarTexto(cidade);
    return limpo
        .replace(/\bsanta barbara d oeste\b|\bsanta barbara do oeste\b|\bsanta barbara\b/g, "santa barbara")
        .trim();
}

// EXTRAIR INFORMAÇÕES DO ENDEREÇO

function extrairDadosEndereco(endereco: string): {
    rua: string | null;
    numero: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
} {
    let rua: string | null = null;
    let numero: string | null = null;
    let bairro: string | null = null;
    let cidade: string | null = null;
    let estado: string | null = null;

    const enderecoLimpo = endereco.replace(/\s+-\s+/g, ", ");
    let partes = enderecoLimpo
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

    if (partes.length === 0) {
        return { rua, numero, bairro, cidade, estado };
    }

    // 0. Remover "Brasil" ou "BR" do final se informado no parâmetro
    if (partes.length > 0 && /^(brasil|br)$/i.test(partes[partes.length - 1])) {
        partes.pop();
    }

    // 1. Identificar Estado (ex: SP, RJ)
    if (partes.length > 0 && /^[A-Za-z]{2}$/.test(partes[partes.length - 1])) {
        estado = partes.pop()!.toUpperCase();
    }

    // 2. Identificar Cidade
    if (partes.length > 0) {
        const possivelCidade = partes[partes.length - 1];
        if (!/\d/.test(possivelCidade)) {
            cidade = partes.pop()!;
        }
    }

    // 3. Identificar Bairro
    const indiceBairro = partes.findIndex((p) =>
        /^(jardim|jd\.?|vila|vl\.?|bairro|parque|pq\.?|residencial)\b/i.test(p)
    );
    if (indiceBairro !== -1) {
        bairro = partes.splice(indiceBairro, 1)[0];
    }

    // 4. Identificar Rua e Número
    const primeiraParte = partes.shift() || "";

    const matchRuaNumero =
        primeiraParte.match(/^(.*?)\s*,\s*(\d+[A-Za-z]?)$/) ||
        primeiraParte.match(/^(.*?)\s+(\d+[A-Za-z]?)$/);

    if (matchRuaNumero) {
        rua = matchRuaNumero[1].trim();
        numero = matchRuaNumero[2].trim();
    } else {
        rua = primeiraParte.trim();

        if (partes.length > 0 && /^\d+[A-Za-z]?$/.test(partes[0])) {
            numero = partes.shift()!;
        }
    }

    return {
        rua,
        numero,
        bairro,
        cidade,
        estado,
    };
}

// TEXTO DO RESULTADO

function textoDoResultado(feature: PeliasFeature): string {
    const properties = feature.properties || {};

    return normalizarTexto(
        [
            properties.label,
            properties.name,
            properties.street,
            properties.housenumber,
            properties.locality,
            properties.localadmin,
            properties.county,
            properties.region,
        ]
            .filter(Boolean)
            .join(" ")
    );
}

// PONTUAR RESULTADO

function pontuarResultado(
    feature: PeliasFeature,
    enderecoOriginal: string
): number {
    const dados = extrairDadosEndereco(enderecoOriginal);
    const properties = feature.properties || {};
    const textoResultado = textoDoResultado(feature);

    const ruaNorm = dados.rua ? normalizarTexto(dados.rua) : "";
    const cidadeNorm = dados.cidade ? normalizarCidade(dados.cidade) : "";
    const textoCidadeNorm = normalizarCidade(textoResultado);

    const cidadeEncontrada = cidadeNorm && textoCidadeNorm.includes(cidadeNorm);

    let pontuacao = 0;
    const ruaEncontrada = ruaNorm && textoResultado.includes(ruaNorm);

    if (ruaEncontrada) pontuacao += 150;
    if (cidadeEncontrada) pontuacao += 100;

    // Penaliza se a cidade pesquisada não bate com o resultado retornado
    if (dados.cidade && !cidadeEncontrada) {
        pontuacao -= 200;
    }

    if (dados.bairro && textoResultado.includes(normalizarTexto(dados.bairro))) {
        pontuacao += 30;
    }

    if (dados.estado && textoResultado.includes(normalizarTexto(dados.estado))) {
        pontuacao += 20;
    }

    if (dados.numero) {
        const numeroResultado = String(properties.housenumber || "").trim();
        if (numeroResultado && numeroResultado === dados.numero) {
            pontuacao += 200;
        }
    }

    return Math.max(0, pontuacao);
}

// VALIDAR RESULTADO

function resultadoValido(
    feature: PeliasFeature,
    enderecoOriginal: string,
    pontuacao: number
): boolean {
    const dados = extrairDadosEndereco(enderecoOriginal);
    const textoResultado = textoDoResultado(feature);

    const ruaNorm = dados.rua ? normalizarTexto(dados.rua) : "";
    const cidadeNorm = dados.cidade ? normalizarCidade(dados.cidade) : "";
    const textoCidadeNorm = normalizarCidade(textoResultado);

    const ruaEncontrada = ruaNorm && textoResultado.includes(ruaNorm);
    const cidadeEncontrada = cidadeNorm && textoCidadeNorm.includes(cidadeNorm);

    // Se informou cidade, é OBRIGATÓRIO ter localizado a mesma cidade
    if (dados.cidade && !cidadeEncontrada) {
        return false;
    }

    // Aprovado se achou Rua + Cidade
    if (ruaEncontrada && cidadeEncontrada) {
        return true;
    }

    if (pontuacao >= 150 && cidadeEncontrada) {
        return true;
    }

    return false;
}

// REQUISIÇÃO JSON

async function requisicaoJson<T>(
    url: string,
    options: RequestInit
): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
        const erro = await response.text();
        throw new Error(`Erro HTTP ${response.status}: ${erro}`);
    }

    return response.json() as Promise<T>;
}

// GEOCODING

export async function geocodeAddress(
    endereco: string
): Promise<GeocodedLocation> {
    if (!endereco.trim()) {
        throw new Error("Endereço não informado.");
    }

    console.log("🔎 Buscando endereço:", endereco);

    const dados = extrairDadosEndereco(endereco);
    console.log("🧩 Endereço identificado:", dados);

    const queries: string[] = [];

    const cidadeQuery = dados.cidade
        ? normalizarCidade(dados.cidade).includes("santa barbara")
            ? "Santa Bárbara d'Oeste"
            : dados.cidade
        : null;

    // 1. Rua + Cidade + Estado
    if (dados.rua && cidadeQuery) {
        const ruaCidade = [dados.rua, cidadeQuery, dados.estado]
            .filter(Boolean)
            .join(", ");
        queries.push(ruaCidade);
    }

    // 2. Rua + Número + Cidade + Estado
    if (dados.rua && cidadeQuery) {
        const estruturadoComNumero = [
            dados.rua,
            dados.numero,
            cidadeQuery,
            dados.estado,
        ]
            .filter(Boolean)
            .join(", ");

        if (!queries.includes(estruturadoComNumero)) {
            queries.push(estruturadoComNumero);
        }
    }

    // 3. Fallback limpo
    const enderecoLimpo = endereco.replace(/\s+-\s+/g, ", ");
    if (!queries.includes(enderecoLimpo)) {
        queries.push(enderecoLimpo);
    }

    let melhorResultado: GeocodingCandidate | null = null;

    for (const query of queries) {
        const url =
            `${ORS_BASE_URL}/pelias/v1/search` +
            `?text=${encodeURIComponent(query)}` +
            `&size=10` +
            `&boundary.country=BR`;

        console.log("🔍 Tentando geocodificação:", query);

        let data: PeliasResponse;

        try {
            data = await requisicaoJson<PeliasResponse>(url, {
                method: "GET",
                headers: {
                    Authorization: String(ORS_API_KEY),
                    Accept: "application/json",
                },
            });
        } catch (error) {
            console.error("❌ Erro no geocoding:", error);
            continue;
        }

        const features = data.features || [];

        if (features.length === 0) {
            console.log("⚠️ Nenhum resultado para:", query);
            continue;
        }

        console.log("📍 Resultados encontrados:");

        const resultados: GeocodingCandidate[] = features.map((feature) => ({
            feature,
            score: pontuarResultado(feature, endereco),
        }));

        resultados.forEach((resultado) => {
            console.log(
                `• ${resultado.feature.properties?.label || "Sem descrição"} | pontuação: ${resultado.score}`
            );
        });

        resultados.sort((a, b) => b.score - a.score);

        const candidato = resultados[0];
        if (!candidato) continue;

        if (!melhorResultado || candidato.score > melhorResultado.score) {
            melhorResultado = candidato;
        }

        if (resultadoValido(candidato.feature, endereco, candidato.score)) {
            melhorResultado = candidato;
            break;
        }
    }

    // Validação Final
    if (!melhorResultado) {
        throw new Error(`O endereço "${endereco}" não foi encontrado.`);
    }

    const feature = melhorResultado.feature;
    const valido = resultadoValido(feature, endereco, melhorResultado.score);

    if (!valido) {
        throw new Error(
            `O endereço "${endereco}" não foi localizado com precisão suficiente na cidade informada.`
        );
    }

    const coordenadas = feature.geometry?.coordinates;

    if (!Array.isArray(coordenadas) || coordenadas.length < 2) {
        throw new Error(
            `O endereço "${endereco}" não possui coordenadas válidas.`
        );
    }

    const longitude = Number(coordenadas[0]);
    const latitude = Number(coordenadas[1]);

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        throw new Error(
            `O endereço "${endereco}" retornou coordenadas inválidas.`
        );
    }

    const label = feature.properties?.label || endereco;

    console.log("🎯 Melhor resultado:", label);
    console.log("⭐ Pontuação:", melhorResultado.score);
    console.log("📍 Coordenadas:", latitude, longitude);

    return {
        latitude,
        longitude,
        label,
    };
}

// ==========================================
// OTIMIZAÇÃO DAS ENTREGAS
// ==========================================

export async function optimizeDeliveryOrder(
    origem: [number, number],
    _destinoFinal: [number, number],
    entregas: {
        id: number;
        coordenadas: [number, number];
    }[]
): Promise<OptimizedOrder> {
    if (entregas.length === 0) {
        return {
            deliveryIds: [],
        };
    }

    function distancia(a: [number, number], b: [number, number]): number {
        const diferencaLongitude = b[0] - a[0];
        const diferencaLatitude = b[1] - a[1];

        return Math.sqrt(
            diferencaLongitude * diferencaLongitude +
                diferencaLatitude * diferencaLatitude
        );
    }

    const restantes = [...entregas];
    const ordem: number[] = [];
    let pontoAtual = origem;

    while (restantes.length > 0) {
        let indiceMaisProximo = 0;
        let menorDistancia = distancia(pontoAtual, restantes[0].coordenadas);

        for (let i = 1; i < restantes.length; i++) {
            const distanciaAtual = distancia(pontoAtual, restantes[i].coordenadas);

            if (distanciaAtual < menorDistancia) {
                menorDistancia = distanciaAtual;
                indiceMaisProximo = i;
            }
        }

        const entrega = restantes[indiceMaisProximo];
        ordem.push(entrega.id);
        pontoAtual = entrega.coordenadas;
        restantes.splice(indiceMaisProximo, 1);
    }

    console.log("🧠 Ordem otimizada:", ordem);

    return {
        deliveryIds: ordem,
    };
}

// ==========================================
// DIRECTIONS
// ==========================================

export async function getDirections(
    coordenadas: [number, number][]
): Promise<DirectionsResult> {
    if (coordenadas.length < 2) {
        throw new Error(
            "É necessário informar pelo menos dois pontos para calcular o trajeto."
        );
    }

    const url = `${ORS_BASE_URL}/openrouteservice/v2/directions/driving-car/geojson`;

    console.log("🛣️ URL Directions:", url);
    console.log("📍 Coordenadas:", coordenadas);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: String(ORS_API_KEY),
            "Content-Type": "application/json",
            Accept: "application/geo+json",
        },
        body: JSON.stringify({
            coordinates: coordenadas,
            instructions: false,
        }),
    });

    console.log("📡 Status Directions:", response.status);

    if (!response.ok) {
        const erro = await response.text();
        console.error("❌ Erro ORS Directions:", erro);
        throw new Error("Não foi possível calcular o trajeto.");
    }

    const data = (await response.json()) as {
        features?: Array<{
            geometry?: {
                type?: string;
                coordinates?: number[][];
            };
            properties?: {
                summary?: {
                    distance?: number;
                    duration?: number;
                };
            };
        }>;
    };

    const feature = data.features?.[0];

    if (!feature) {
        throw new Error("O ORS não retornou a rota.");
    }

    const distancia = Number(feature.properties?.summary?.distance);
    const duracao = Number(feature.properties?.summary?.duration);

    if (!Number.isFinite(distancia) || !Number.isFinite(duracao)) {
        throw new Error("O ORS retornou distância ou duração inválida.");
    }

    const coordenadasRota = feature.geometry?.coordinates;

    if (!Array.isArray(coordenadasRota) || coordenadasRota.length === 0) {
        throw new Error("O ORS não retornou a geometria da rota.");
    }

    const geometria: GeoJSONLineString = {
        type: "LineString",
        coordinates: coordenadasRota.map((ponto) => [
            Number(ponto[0]),
            Number(ponto[1]),
        ]),
    };

    console.log("✅ Trajeto calculado com sucesso!");

    return {
        distanciaMetros: distancia,
        duracaoSegundos: duracao,
        geometria,
    };
}