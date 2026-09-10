import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Share,
} from "react-native";

import { useRef } from "react";

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

import { colors } from "@/theme/colors";
import { styles } from "./styles";

// ==========================================
// PROPS
// ==========================================

type Props = NativeStackScreenProps<
    RootStackParamList,
    "RouteResult"
>;

// ==========================================
// COMPONENTE
// ==========================================

export function RouteResult({
    route,
    navigation,
}: Props) {

    // ==========================================
    // REFERÊNCIA DO MAPA
    // ==========================================

    const mapRef =
        useRef<MapView>(null);

    // ==========================================
    // RESULTADO DA ROTA
    // ==========================================

    const resultado =
        route.params.route;

    // ==========================================
    // QUANTIDADE DE ENTREGAS
    // ==========================================

    const quantidadeEntregas =
        resultado.rotaOrdenada.filter(
            (parada) =>
                parada.tipo === "ENTREGA"
        ).length;

    // ==========================================
    // TEMPO DAS PARADAS
    // ==========================================

    const tempoParadas =
        resultado.tempoParadasMinutos ??
        quantidadeEntregas * 5;

    // ==========================================
    // TEMPO TOTAL
    // ==========================================

    const tempoTotal =
        resultado.tempoTotalMinutos ??
        (
            (resultado.tempoDeslocamentoMinutos ?? 0) +
            tempoParadas
        );

    // ==========================================
    // COORDENADAS DA ROTA
    // ==========================================

    const coordenadasRota: LatLng[] =
        resultado.geometria?.coordinates?.map(
            ([longitude, latitude]) => ({
                latitude,
                longitude,
            })
        ) ?? [];

    // ==========================================
    // AJUSTAR MAPA À ROTA
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
                    right: 40,
                    bottom: 50,
                    left: 40,
                },
                animated: false,
            }
        );
    }

    // ==========================================
    // COMPARTILHAR
    // ==========================================

    async function handleShare() {

        try {

            await Share.share({

                message:
                    `Rota otimizada\n\n` +
                    `Distância: ${resultado.distanciaTotalKm.toFixed(
                        1
                    )} km\n` +
                    `Tempo estimado: ${tempoTotal} min\n` +
                    `Consumo: ${resultado.litrosConsumidos.toFixed(
                        2
                    )} L\n` +
                    `Custo estimado: R$ ${resultado.custoEstimadoCombustivel.toFixed(
                        2
                    )}`,

            });

        } catch (error) {

            console.error(
                "❌ Erro ao compartilhar:",
                error
            );

        }
    }

    // ==========================================
    // INICIAR ROTA
    // ==========================================

    function handleStartRoute() {

        console.log(
            "🚀 Iniciando rota"
        );

        // Próxima etapa:
        // abrir tela de rota em andamento
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

                {/* VOLTAR */}

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


                {/* TÍTULO */}

                <Text
                    style={
                        styles.headerTitle
                    }
                >
                    ROTA
                </Text>


                {/* COMPARTILHAR */}

                <TouchableOpacity
                    style={
                        styles.headerButton
                    }
                    onPress={
                        handleShare
                    }
                >

                    <Ionicons
                        name="share-outline"
                        size={23}
                        color={
                            colors.black
                        }
                    />

                </TouchableOpacity>

            </View>


            {/* ==========================================
                MAPA
            ========================================== */}

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

                            latitudeDelta:
                                0.03,

                            longitudeDelta:
                                0.03,
                        }}

                        onMapReady={
                            ajustarMapa
                        }
                    >

                        {/* ==================================
                            LINHA DA ROTA
                        ================================== */}

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

                        {resultado.rotaOrdenada.map(
                            (parada) => {

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
                                            key={
                                                `origem-${parada.ordem}`
                                            }

                                            coordinate={
                                                coordenada
                                            }

                                            title="Origem"

                                            description={
                                                parada.enderecoFormatado
                                            }

                                            pinColor="green"
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
                                            key={
                                                `destino-${parada.ordem}`
                                            }

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
                                // ENTREGA
                                // ==================================

                                return (

                                    <Marker
                                        key={
                                            `entrega-${parada.ordem}`
                                        }

                                        coordinate={
                                            coordenada
                                        }

                                        title={
                                            `Entrega ${
                                                parada.ordem - 1
                                            }`
                                        }

                                        description={
                                            parada.enderecoFormatado
                                        }

                                        pinColor="orange"
                                    />

                                );

                            }
                        )}

                    </MapView>

                ) : (

                    // ==========================================
                    // MAPA SEM GEOMETRIA
                    // ==========================================

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
                            carregar a rota no mapa.
                        </Text>

                        <Text
                            style={
                                styles.mapEmptyText
                            }
                        >
                            A API não retornou
                            a geometria da rota.
                        </Text>

                    </View>

                )}

            </View>


            {/* ==========================================
                INFORMAÇÕES
            ========================================== */}

            <View
                style={
                    styles.infoContainer
                }
            >

                {/* ==================================
                    DISTÂNCIA
                ================================== */}

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
                        Distância total
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        {
                            resultado.distanciaTotalKm.toFixed(
                                1
                            )
                        }{" "}
                        km
                    </Text>

                </View>


                {/* ==================================
                    TEMPO
                ================================== */}

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
                        Tempo estimado
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        {tempoTotal} min
                    </Text>

                </View>


                {/* ==================================
                    CONSUMO
                ================================== */}

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
                        Consumo estimado
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        {
                            resultado.litrosConsumidos.toFixed(
                                2
                            )
                        }{" "}
                        L
                    </Text>

                </View>


                {/* ==================================
                    CUSTO
                ================================== */}

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
                        Custo estimado
                    </Text>

                    <Text
                        style={
                            styles.infoValue
                        }
                    >
                        R${" "}

                        {
                            resultado.custoEstimadoCombustivel.toFixed(
                                2
                            )
                        }

                    </Text>

                </View>

            </View>


            {/* ==========================================
                BOTÃO INICIAR ROTA
            ========================================== */}

            <TouchableOpacity
                style={
                    styles.startButton
                }

                onPress={
                    handleStartRoute
                }

                activeOpacity={0.8}
            >

                <Text
                    style={
                        styles.startButtonText
                    }
                >
                    Iniciar rota
                </Text>

            </TouchableOpacity>

        </SafeAreaView>
    );
}