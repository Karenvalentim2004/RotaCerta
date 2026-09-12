import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
} from "react-native";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import {
    RootStackParamList,
} from "@/navigation";

import {
    getRoutes,
    getRouteById,
} from "@/services/authService";

import { colors } from "@/theme/colors";
import { styles } from "./styles";


// ==========================================
// TIPO DA ROTA
// ==========================================

interface RouteHistory {
    id: number;

    data_rota: string;

    veiculo_id: number;

    origem: string;

    destino_final: string;

    distancia_total_km: number;

    tempo_total_minutos: number;

    litros_consumidos: number;

    custo_estimado: number;
}


// ==========================================
// FILTRO
// ==========================================

type Filtro =
    | "todas"
    | "recentes";


// ==========================================
// NAVEGAÇÃO
// ==========================================

type NavigationProp =
    NativeStackNavigationProp<
        RootStackParamList
    >;


// ==========================================
// TELA
// ==========================================

export function History() {

    const navigation =
        useNavigation<NavigationProp>();


    // ==========================================
    // ESTADOS
    // ==========================================

    const [
        filtroAberto,
        setFiltroAberto,
    ] = useState(false);

    const [
        filtro,
        setFiltro,
    ] = useState<Filtro>("todas");

    const [
        rotas,
        setRotas,
    ] = useState<RouteHistory[]>([]);

    const [
        carregando,
        setCarregando,
    ] = useState(true);

    const [
        carregandoRota,
        setCarregandoRota,
    ] = useState(false);


    // ==========================================
    // BUSCAR HISTÓRICO
    // ==========================================

    async function carregarHistorico() {

        try {

            setCarregando(true);

            const dados =
                await getRoutes();


            // ==========================================
            // NORMALIZAR DADOS
            // ==========================================

            const rotasFormatadas =
                dados.map(
                    (
                        rota: any
                    ) => ({

                        id:
                            Number(
                                rota.id
                            ),

                        data_rota:
                            String(
                                rota.data_rota
                            ),

                        veiculo_id:
                            Number(
                                rota.veiculo_id
                            ),

                        origem:
                            String(
                                rota.origem
                            ),

                        destino_final:
                            String(
                                rota.destino_final
                            ),

                        distancia_total_km:
                            Number(
                                rota.distancia_total_km
                            ),

                        tempo_total_minutos:
                            Number(
                                rota.tempo_total_minutos
                            ),

                        litros_consumidos:
                            Number(
                                rota.litros_consumidos
                            ),

                        custo_estimado:
                            Number(
                                rota.custo_estimado
                            ),

                    })
                );


            setRotas(
                rotasFormatadas
            );


        } catch (error: any) {

            console.error(
                "❌ Erro ao carregar histórico:",
                error
            );


            Alert.alert(
                "Erro",
                error?.message ||
                "Não foi possível carregar o histórico."
            );


        } finally {

            setCarregando(false);

        }

    }


    // ==========================================
    // CARREGAR AO ABRIR A TELA
    // ==========================================

    useEffect(() => {

        carregarHistorico();

    }, []);


    // ==========================================
    // FORMATAR DATA
    // ==========================================

    function formatarData(
        data: string
    ) {

        if (!data) {
            return "--/--/----";
        }


        const dataObj =
            new Date(data);


        if (
            Number.isNaN(
                dataObj.getTime()
            )
        ) {

            return data;

        }


        const dia =
            String(
                dataObj.getDate()
            ).padStart(
                2,
                "0"
            );

        const mes =
            String(
                dataObj.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const ano =
            dataObj.getFullYear();


        return `${dia}/${mes}/${ano}`;

    }


    // ==========================================
    // FORMATAR HORA
    // ==========================================

    function formatarHora(
        data: string
    ) {

        if (!data) {
            return "--:--";
        }


        const dataObj =
            new Date(data);


        if (
            Number.isNaN(
                dataObj.getTime()
            )
        ) {

            return "--:--";

        }


        const hora =
            String(
                dataObj.getHours()
            ).padStart(
                2,
                "0"
            );

        const minuto =
            String(
                dataObj.getMinutes()
            ).padStart(
                2,
                "0"
            );


        return `${hora}:${minuto}`;

    }


    // ==========================================
    // FORMATAR TEMPO
    // ==========================================

    function formatarTempo(
        minutos: number
    ) {

        if (!minutos) {
            return "0 min";
        }


        const horas =
            Math.floor(
                minutos / 60
            );

        const minutosRestantes =
            minutos % 60;


        if (horas > 0) {

            if (
                minutosRestantes === 0
            ) {

                return `${horas},0hr`;

            }


            return `${horas},${Math.round(
                minutosRestantes / 60 * 10
            )}hrs`;

        }


        return `${minutos} min`;

    }


    // ==========================================
    // ROTAS FILTRADAS
    // ==========================================

    const rotasFiltradas =
        useMemo(() => {

            if (
                filtro ===
                "recentes"
            ) {

                return [
                    ...rotas,
                ].sort(
                    (
                        a,
                        b
                    ) => {

                        const dataA =
                            new Date(
                                a.data_rota
                            ).getTime();

                        const dataB =
                            new Date(
                                b.data_rota
                            ).getTime();

                        return (
                            dataB -
                            dataA
                        );

                    }
                );

            }


            return rotas;

        }, [
            rotas,
            filtro,
        ]);


    // ==========================================
    // SELECIONAR FILTRO
    // ==========================================

    function selecionarFiltro(
        novoFiltro: Filtro
    ) {

        setFiltro(
            novoFiltro
        );

        setFiltroAberto(
            false
        );

    }


    // ==========================================
    // ABRIR DETALHES DA ROTA
    // ==========================================

    async function abrirRota(
        id: number
    ) {

        try {

            setCarregandoRota(
                true
            );


            const dados =
                await getRouteById(
                    id
                );


            console.log(
                "📍 Rota selecionada:",
                dados
            );


            /*
             * O backend retorna:
             *
             * {
             *     rota: {...},
             *     entregas: [...]
             * }
             *
             * Aqui futuramente podemos
             * montar a mesma estrutura
             * usada pelo RouteResult.
             */


            navigation.navigate(
                "RouteDetails",
                {
                    route: {
                        ...dados.rota,

                        id:
                            Number(
                                dados.rota.id
                            ),

                        distanciaTotalKm:
                            Number(
                                dados.rota
                                    .distancia_total_km
                            ),

                        tempoDeslocamentoMinutos:
                            Number(
                                dados.rota
                                    .tempo_deslocamento_minutos
                            ),

                        tempoParadasMinutos:
                            Number(
                                dados.rota
                                    .tempo_paradas_minutos
                            ),

                        tempoTotalMinutos:
                            Number(
                                dados.rota
                                    .tempo_total_minutos
                            ),

                        litrosConsumidos:
                            Number(
                                dados.rota
                                    .litros_consumidos
                            ),

                        custoEstimadoCombustivel:
                            Number(
                                dados.rota
                                    .custo_estimado
                            ),

                        geometria:
                            dados.rota
                                .geometria,

                        rotaOrdenada: [
                            {
                                ordem: 1,

                                tipo:
                                    "ORIGEM",

                                enderecoFormatado:
                                    dados.rota
                                        .origem,
                            },

                            ...dados.entregas.map(
                                (
                                    entrega: any
                                ) => ({

                                    ordem:
                                        Number(
                                            entrega.ordem
                                        ) + 1,

                                    tipo:
                                        "ENTREGA",

                                    enderecoFormatado:
                                        [
                                            entrega.rua,
                                            entrega.numero,
                                            entrega.bairro,
                                            entrega.cidade,
                                            entrega.estado,
                                        ]
                                            .filter(
                                                Boolean
                                            )
                                            .join(
                                                ", "
                                            ),

                                    destinatario:
                                        entrega
                                            .destinatario ??
                                        null,

                                    latitude:
                                        entrega
                                            .latitude,

                                    longitude:
                                        entrega
                                            .longitude,

                                })
                            ),

                            {
                                ordem:
                                    dados.entregas.length +
                                    2,

                                tipo:
                                    "DESTINO_FINAL",

                                enderecoFormatado:
                                    dados.rota
                                        .destino_final,
                            },

                        ],

                    } as any,
                }
            );


        } catch (error: any) {

            console.error(
                "❌ Erro ao abrir rota:",
                error
            );


            Alert.alert(
                "Erro",
                error?.message ||
                "Não foi possível abrir os detalhes da rota."
            );


        } finally {

            setCarregandoRota(
                false
            );

        }

    }


    // ==========================================
    // RENDERIZAR ROTA
    // ==========================================

    function renderRoute({
        item,
    }: {
        item: RouteHistory;
    }) {

        const data =
            formatarData(
                item.data_rota
            );

        const hora =
            formatarHora(
                item.data_rota
            );

        const tempo =
            formatarTempo(
                item.tempo_total_minutos
            );


        return (

            <TouchableOpacity
                style={
                    styles.routeCard
                }

                activeOpacity={
                    0.8
                }

                onPress={() =>
                    abrirRota(
                        item.id
                    )
                }

                disabled={
                    carregandoRota
                }
            >

                {/* ==================================
                    MINI MAPA
                ================================== */}

                <View
                    style={
                        styles.routeMap
                    }
                >

                    <View
                        style={
                            styles.mapPlaceholder
                        }
                    >

                        <Ionicons
                            name="map-outline"
                            size={32}
                            color={
                                colors.green[500]
                            }
                        />

                    </View>

                </View>


                {/* ==================================
                    INFORMAÇÕES
                ================================== */}

                <View
                    style={
                        styles.routeInfo
                    }
                >

                    {/* DATA / HORA */}

                    <View
                        style={
                            styles.routeHeader
                        }
                    >

                        <Text
                            style={
                                styles.routeTitle
                            }
                        >
                            Rota - {data}
                        </Text>


                        <Text
                            style={
                                styles.routeTime
                            }
                        >
                            {hora}
                        </Text>

                    </View>


                    {/* DISTÂNCIA */}

                    <Text
                        style={
                            styles.routeDistance
                        }
                    >
                        {item.distancia_total_km.toFixed(
                            1
                        )}{" "}
                        km total
                    </Text>


                    {/* TEMPO / COMBUSTÍVEL */}

                    <View
                        style={
                            styles.routeDetails
                        }
                    >

                        <View
                            style={
                                styles.detailItem
                            }
                        >

                            <Ionicons
                                name="time"
                                size={15}
                                color={
                                    colors.green[500]
                                }
                            />

                            <Text
                                style={
                                    styles.detailText
                                }
                            >
                                {tempo}
                            </Text>

                        </View>


                        <View
                            style={
                                styles.detailItem
                            }
                        >

                            <FontAwesome6
                                name="gas-pump"
                                size={14}
                                color={
                                    colors.green[500]
                                }
                            />

                            <Text
                                style={
                                    styles.detailText
                                }
                            >
                                {
                                    item.litros_consumidos
                                }{" "}
                                L
                            </Text>

                        </View>

                    </View>

                </View>

            </TouchableOpacity>

        );

    }


    // ==========================================
    // LOADING
    // ==========================================

    if (carregando) {

        return (

            <SafeAreaView
                style={
                    styles.container
                }
            >

                <View
                    style={{
                        flex: 1,
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >

                    <ActivityIndicator
                        size="large"
                        color={
                            colors.green[500]
                        }
                    />

                    <Text
                        style={{
                            marginTop: 12,
                            color:
                                colors.gray[600],
                        }}
                    >
                        Carregando histórico...
                    </Text>

                </View>

            </SafeAreaView>

        );

    }


    // ==========================================
    // TELA
    // ==========================================

    return (

        <SafeAreaView
            style={
                styles.container
            }
        >

            {/* ==========================================
                CABEÇALHO
            ========================================== */}

            <View
                style={
                    styles.header
                }
            >

                <TouchableOpacity
                    style={
                        styles.backButton
                    }

                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color={
                            colors.black
                        }
                    />

                </TouchableOpacity>


                <Text
                    style={
                        styles.headerTitle
                    }
                >
                    HISTÓRICOS DAS ROTAS
                </Text>


                <View
                    style={
                        styles.headerSpacer
                    }
                />

            </View>


            {/* ==========================================
                FILTRO ÚNICO
            ========================================== */}

            <View
                style={
                    styles.filterContainer
                }
            >

                <TouchableOpacity
                    style={
                        styles.filterButton
                    }

                    onPress={() =>
                        setFiltroAberto(
                            !filtroAberto
                        )
                    }

                    activeOpacity={
                        0.8
                    }
                >

                    <Text
                        style={
                            styles.filterText
                        }
                    >
                        {filtro ===
                        "todas"
                            ? "Todas as rotas"
                            : "Mais recentes"}
                    </Text>


                    <Ionicons
                        name={
                            filtroAberto
                                ? "chevron-up"
                                : "chevron-down"
                        }

                        size={17}

                        color={
                            colors.black
                        }
                    />

                </TouchableOpacity>


                {/* ==================================
                    OPÇÕES
                ================================== */}

                {filtroAberto && (

                    <View
                        style={
                            styles.filterDropdown
                        }
                    >

                        {/* TODAS */}

                        <TouchableOpacity
                            style={
                                styles.filterOption
                            }

                            onPress={() =>
                                selecionarFiltro(
                                    "todas"
                                )
                            }
                        >

                            <Text
                                style={
                                    styles.filterOptionText
                                }
                            >
                                Todas as rotas
                            </Text>


                            {filtro ===
                                "todas" && (

                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color={
                                        colors.green[500]
                                    }
                                />

                            )}

                        </TouchableOpacity>


                        {/* MAIS RECENTES */}

                        <TouchableOpacity
                            style={
                                styles.filterOption
                            }

                            onPress={() =>
                                selecionarFiltro(
                                    "recentes"
                                )
                            }
                        >

                            <Text
                                style={
                                    styles.filterOptionText
                                }
                            >
                                Mais recentes
                            </Text>


                            {filtro ===
                                "recentes" && (

                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color={
                                        colors.green[500]
                                    }
                                />

                            )}

                        </TouchableOpacity>

                    </View>

                )}

            </View>


            {/* ==========================================
                LISTA
            ========================================== */}

            {rotasFiltradas.length === 0 ? (

                <View
                    style={{
                        flex: 1,
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        paddingHorizontal: 30,
                    }}
                >

                    <Ionicons
                        name="map-outline"
                        size={45}
                        color={
                            colors.gray[500]
                        }
                    />

                    <Text
                        style={{
                            marginTop: 12,
                            fontSize: 15,
                            fontWeight:
                                "600",
                            color:
                                colors.black,
                            textAlign:
                                "center",
                        }}
                    >
                        Nenhuma rota encontrada
                    </Text>

                </View>

            ) : (

                <FlatList
                    data={
                        rotasFiltradas
                    }

                    keyExtractor={(
                        item
                    ) =>
                        String(
                            item.id
                        )
                    }

                    renderItem={
                        renderRoute
                    }

                    showsVerticalScrollIndicator={
                        false
                    }

                    contentContainerStyle={
                        styles.listContent
                    }
                />

            )}

        </SafeAreaView>

    );

}