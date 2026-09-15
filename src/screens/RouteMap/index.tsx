import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";

import {
    useRef,
    useState,
} from "react";

import MapView, {
    Marker,
    Polyline,
    PROVIDER_GOOGLE,
    LatLng,
} from "react-native-maps";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    RootStackParamList,
} from "@/navigation";

import type {
    RoutePoint,
} from "@/services/optimizeRoute";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "RouteMap"
>;

export function RouteMap({
    route,
    navigation,
}: Props) {

    // ==========================================
    // REFERÊNCIA DO MAPA
    // ==========================================

    const mapRef =
        useRef<MapView>(null);

    // ==========================================
    // ROTA
    // ==========================================

    const resultado =
        route.params.route;

    // ==========================================
    // PARADAS
    // ==========================================

    const paradas: RoutePoint[] =
        resultado.rotaOrdenada ?? [];

    // ==========================================
    // ENTREGAS
    // ==========================================

    const entregas: RoutePoint[] =
        paradas.filter(
            (parada: RoutePoint) =>
                parada.tipo === "ENTREGA"
        );

    // ENTREGA ATUAL

    const [
        entregaAtual,
        setEntregaAtual,
    ] = useState(0);

    // TODAS AS ENTREGAS CONCLUÍDAS?

    const rotaFinalizada =
        entregaAtual >= entregas.length;

    // PRÓXIMA ENTREGA

    const proximaEntrega =
        entregas[entregaAtual];

    // NÚMERO DA ENTREGA

    const numeroEntrega =
        proximaEntrega
            ? entregaAtual + 1
            : entregas.length;

    // DESTINO FINAL

    const destinoFinal =
        paradas.find(
            (parada: RoutePoint) =>
                parada.tipo ===
                "DESTINO_FINAL"
        );

    // COORDENADAS DA GEOMETRIA

    const coordenadasRota: LatLng[] =
        (
            resultado.geometria
                ?.coordinates ?? []
        ).map(
            (
                coordenada: [
                    number,
                    number
                ]
            ) => {

                const [
                    longitude,
                    latitude,
                ] = coordenada;

                return {
                    latitude,
                    longitude,
                };
            }
        );

    // ==========================================
    // DISTÂNCIA RESTANTE
    // ==========================================

    const distanciaRestante =
        resultado.distanciaTotalKm;

    // ==========================================
    // TEMPO RESTANTE
    // ==========================================

    const tempoDeslocamento =
        resultado.tempoDeslocamentoMinutos ?? 0;

    const quantidadeEntregas =
        entregas.length;

    const entregasRestantes =
        Math.max(
            quantidadeEntregas -
            entregaAtual,
            0
        );

    const tempoParadas =
        entregasRestantes * 5;

    const tempoRestante =
        tempoDeslocamento +
        tempoParadas;

    // ==========================================
    // AJUSTAR MAPA
    // ==========================================

    function ajustarMapa() {

        if (
            coordenadasRota.length === 0 ||
            !mapRef.current
        ) {
            return;
        }

        mapRef.current.fitToCoordinates(
            coordenadasRota,
            {
                edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                animated: false,
            }
        );
    }

    // ==========================================
    // CONCLUIR ENTREGA
    // ==========================================

    function handleCompleteDelivery() {

        if (
            entregaAtual <
            entregas.length
        ) {

            setEntregaAtual(
                entregaAtual + 1
            );
        }
    }

    // ==========================================
    // FINALIZAR ROTA
    // ==========================================

    function handleFinishRoute() {

        navigation.goBack();
    }

    // ==========================================
    // ENCERRAR ROTA
    // ==========================================

    function handleEndRoute() {

        navigation.goBack();
    }

    // ==========================================
    // TELA
    // ==========================================

    return (

        <SafeAreaView
            style={styles.container}
        >

            {/* ==========================================
                CABEÇALHO
            ========================================== */}

            <View
                style={styles.header}
            >

                <TouchableOpacity
                    style={
                        styles.headerButton
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
                    ROTA EM ANDAMENTO
                </Text>

                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() =>
                        navigation.navigate(
                            "RouteDetails",
                            {
                                route: resultado,
                            }
                        )
                    }
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        size={22}
                        color={colors.black}
                    />
                </TouchableOpacity>

            </View>

            {/* MAPA*/}

            <View
                style={
                    styles.mapContainer
                }
            >

                {coordenadasRota.length > 0 ? (

                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={
                            PROVIDER_GOOGLE
                        }

                        initialRegion={{
                            latitude:
                                coordenadasRota[0]
                                    .latitude,

                            longitude:
                                coordenadasRota[0]
                                    .longitude,

                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,
                        }}

                        onMapReady={
                            ajustarMapa
                        }
                    >

                        {/* LINHA DA ROTA */}

                        <Polyline
                            coordinates={
                                coordenadasRota
                            }
                            strokeWidth={5}
                            strokeColor={
                                colors.blue[500]
                            }
                            lineCap="round"
                            lineJoin="round"
                        />

                        {/* ==================================
                            MARCADORES
                        ================================== */}

                        {paradas.map(
                            (
                                parada: RoutePoint,
                                index: number
                            ) => {

                                const coordenada = {
                                    latitude:
                                        parada.latitude,

                                    longitude:
                                        parada.longitude,
                                };

                                // ==================================
                                // ORIGEM
                                // ==================================

                                if (
                                    parada.tipo ===
                                    "ORIGEM"
                                ) {

                                    return (
                                        <Marker
                                            key={`origem-${index}`}
                                            coordinate={
                                                coordenada
                                            }
                                            title="Origem"
                                            description={
                                                parada.enderecoFormatado
                                            }
                                            pinColor="black"
                                        />
                                    );
                                }

                                // ==================================
                                // DESTINO FINAL
                                // ==================================

                                if (
                                    parada.tipo ===
                                    "DESTINO_FINAL"
                                ) {

                                    return (
                                        <Marker
                                            key={`destino-${index}`}
                                            coordinate={
                                                coordenada
                                            }
                                            title="Destino final"
                                            description={
                                                parada.enderecoFormatado
                                            }
                                            pinColor="red"
                                        />
                                    );
                                }

                                // ==================================
                                // NÚMERO DA ENTREGA
                                // ==================================

                                const numero =
                                    entregas.indexOf(
                                        parada
                                    ) + 1;

                                const concluida =
                                    numero <=
                                    entregaAtual;

                                return (
                                    <Marker
                                        key={`entrega-${index}`}
                                        coordinate={
                                            coordenada
                                        }
                                        title={`Entrega ${numero}`}
                                        description={
                                            parada.enderecoFormatado
                                        }
                                    >

                                        <View
                                            style={[
                                                styles.deliveryMarker,
                                                concluida &&
                                                styles.deliveryMarkerCompleted,
                                            ]}
                                        >

                                            <Text
                                                style={
                                                    styles.deliveryMarkerText
                                                }
                                            >
                                                {concluida
                                                    ? "✓"
                                                    : numero}
                                            </Text>

                                        </View>

                                    </Marker>
                                );
                            }
                        )}

                    </MapView>

                ) : (

                    <View
                        style={
                            styles.mapEmpty
                        }
                    >

                        <Text
                            style={
                                styles.mapEmptyText
                            }
                        >
                            Não foi possível
                            carregar o mapa.
                        </Text>

                    </View>

                )}

            </View>

            {/* ==========================================
                PRÓXIMA PARADA
            ========================================== */}

            <View
                style={
                    styles.nextStopCard
                }
            >

                <View
                    style={
                        styles.nextStopContent
                    }
                >

                    <Text
                        style={
                            styles.nextStopLabel
                        }
                    >
                        {rotaFinalizada
                            ? "Destino final"
                            : `Próxima parada • Entrega ${numeroEntrega}`}
                    </Text>

                    <Text
                        style={
                            styles.nextStopAddress
                        }
                        numberOfLines={2}
                    >
                        {rotaFinalizada
                            ? destinoFinal?.enderecoFormatado ??
                            "Destino final"
                            : proximaEntrega?.enderecoFormatado ??
                            "Nenhuma entrega pendente"}
                    </Text>

                </View>

                <View
                    style={
                        styles.nextStopRight
                    }
                >

                    <Text
                        style={
                            styles.nextStopDistance
                        }
                    >
                        {rotaFinalizada
                            ? "Destino"
                            : `${distanciaRestante.toFixed(
                                1
                            )} km`}
                    </Text>

                    <Ionicons
                        name="navigate"
                        size={20}
                        color={
                            colors.green[500]
                        }
                    />

                </View>

            </View>

            {/* ==========================================
                PROGRESSO
            ========================================== */}

            <View
                style={
                    styles.progressContainer
                }
            >

                <View
                    style={
                        styles.progressHeader
                    }
                >

                    <Text
                        style={
                            styles.progressTitle
                        }
                    >
                        Progresso da rota
                    </Text>

                    <Text
                        style={
                            styles.progressCount
                        }
                    >
                        {Math.min(
                            entregaAtual,
                            quantidadeEntregas
                        )}{" "}
                        /{" "}
                        {quantidadeEntregas}
                    </Text>

                </View>

                <View
                    style={
                        styles.progressBar
                    }
                >

                    <View
                        style={[
                            styles.progressFill,
                            {
                                width:
                                    quantidadeEntregas >
                                        0
                                        ? `${Math.min(
                                            (entregaAtual /
                                                quantidadeEntregas) *
                                            100,
                                            100
                                        )
                                        }%`
                                        : "0%",
                            },
                        ]}
                    />

                </View>

            </View>

            {/* ==========================================
                INFORMAÇÕES
            ========================================== */}

            <View
                style={
                    styles.infoContainer
                }
            >

                <View
                    style={
                        styles.infoCard
                    }
                >

                    <Text
                        style={
                            styles.infoLabel
                        }
                    >
                        Distância restante
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        {distanciaRestante.toFixed(
                            1
                        )}{" "}
                        km
                    </Text>

                </View>

                <View
                    style={
                        styles.infoCard
                    }
                >

                    <Text
                        style={
                            styles.infoLabel
                        }
                    >
                        Tempo restante
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        {tempoRestante} min
                    </Text>

                </View>

            </View>

            {/* ==========================================
                AÇÃO PRINCIPAL
            ========================================== */}

            {!rotaFinalizada ? (

                <TouchableOpacity
                    style={
                        styles.completeButton
                    }
                    onPress={
                        handleCompleteDelivery
                    }
                    activeOpacity={0.8}
                >

                    <Ionicons
                        name="checkmark-circle-outline"
                        size={21}
                        color={
                            colors.white
                        }
                    />

                    <Text
                        style={
                            styles.completeButtonText
                        }
                    >
                        Concluir entrega
                    </Text>

                </TouchableOpacity>

            ) : (

                <TouchableOpacity
                    style={
                        styles.completeButton
                    }
                    onPress={
                        handleFinishRoute
                    }
                    activeOpacity={0.8}
                >

                    <Ionicons
                        name="flag-outline"
                        size={21}
                        color={
                            colors.white
                        }
                    />

                    <Text
                        style={
                            styles.completeButtonText
                        }
                    >
                        Finalizar rota
                    </Text>

                </TouchableOpacity>

            )}

            {/* ==========================================
                ENCERRAR ROTA
            ========================================== */}

            {!rotaFinalizada && (

                <TouchableOpacity
                    style={
                        styles.endButton
                    }
                    onPress={
                        handleEndRoute
                    }
                    activeOpacity={0.8}
                >

                    <Text
                        style={
                            styles.endButtonText
                        }
                    >
                        Encerrar Rota
                    </Text>

                </TouchableOpacity>

            )}

        </SafeAreaView>
    );
}