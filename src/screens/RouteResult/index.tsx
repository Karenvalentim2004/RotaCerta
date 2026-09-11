import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Share,
    ScrollView,
} from "react-native";

import { useRef } from "react";

import MapView, {
    Marker,
    Polyline,
    PROVIDER_GOOGLE,
    LatLng,
} from "react-native-maps";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import {
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
    RootStackParamList,
} from "@/navigation";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "RouteResult"
>;

export function RouteResult({
    route,
    navigation,
}: Props) {

    // REFERÊNCIA DO MAPA

    const mapRef = useRef<MapView>(null);

    // RESULTADO DA ROTA

    const resultado = route.params.route;

    // QUANTIDADE DE ENTREGAS

    const quantidadeEntregas =
        resultado.rotaOrdenada.filter(
            (parada) =>
                parada.tipo === "ENTREGA"
        ).length;

    // TEMPO TOTAL

    const tempoParadas =
        quantidadeEntregas * 5;

    const tempoTotal =
        resultado.tempoDeslocamentoMinutos +
        tempoParadas;

    // COORDENADAS DA ROTA

    const coordenadasRota: LatLng[] =
        resultado.geometria.coordinates.map(
            ([longitude, latitude]) => ({
                latitude,
                longitude,
            })
        );

    // AJUSTAR MAPA À ROTA

    function ajustarMapa() {
        if (
            coordenadasRota.length === 0 ||
            !mapRef.current
        ) {
            return;
        }

        setTimeout(() => {
            mapRef.current?.fitToCoordinates(
                coordenadasRota,
                {
                    edgePadding: {
                        top: 50,
                        right: 50,
                        bottom: 50,
                        left: 50,
                    },
                    animated: true,
                }
            );
        }, 300);
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
                "Erro ao compartilhar:",
                error
            );
        }
    }


    // INICIAR ROTA

    function handleStartRoute() {

        navigation.navigate(
            "RouteMap",
            {
                route: resultado,
            }
        );
    }

    // RENDER

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >

                    {/* CABEÇALHO */}

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
                        ROTA
                    </Text>

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

                    {/* MAPA */}

                <View
                    style={
                        styles.mapContainer
                    }
                >
                    {coordenadasRota.length >
                        0 ? (
                        <MapView
                            ref={mapRef}
                            style={
                                styles.map
                            }
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
                                strokeWidth={
                                    5
                                }
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
                                (
                                    parada
                                ) => {
                                    const coordenada =
                                    {
                                        latitude:
                                            parada.latitude,
                                        longitude:
                                            parada.longitude,
                                    };

                                    {/* ==========================
                                        ORIGEM
                                    ========================== */}

                                    if (
                                        parada.tipo ===
                                        "ORIGEM"
                                    ) {
                                        return (
                                            <Marker
                                                key={`origem-${parada.ordem}`}
                                                coordinate={
                                                    coordenada
                                                }
                                                title="Origem"
                                                description={
                                                    parada.enderecoFormatado
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.originMarker
                                                    }
                                                >
                                                    <FontAwesome6
                                                        name="location-dot"
                                                        size={
                                                            18
                                                        }
                                                        color={
                                                            colors.white
                                                        }
                                                    />
                                                </View>
                                            </Marker>
                                        );
                                    }

                                    {/* ==========================
                                        DESTINO FINAL
                                    ========================== */}

                                    if (
                                        parada.tipo ===
                                        "DESTINO_FINAL"
                                    ) {
                                        return (
                                            <Marker
                                                key={`destino-${parada.ordem}`}
                                                coordinate={
                                                    coordenada
                                                }
                                                title="Destino final"
                                                description={
                                                    parada.enderecoFormatado
                                                }
                                            >
                                                <View
                                                    style={
                                                        styles.destinationMarker
                                                    }
                                                >
                                                    <FontAwesome6
                                                        name="flag-checkered"
                                                        size={
                                                            16
                                                        }
                                                        color={
                                                            colors.white
                                                        }
                                                    />
                                                </View>
                                            </Marker>
                                        );
                                    }
                                   
                                        // ENTREGA

                                    const numeroEntrega =
                                        resultado.rotaOrdenada
                                            .filter(
                                                (
                                                    item
                                                ) =>
                                                    item.tipo ===
                                                    "ENTREGA"
                                            )
                                            .findIndex(
                                                (
                                                    item
                                                ) =>
                                                    item.ordem ===
                                                    parada.ordem
                                            ) + 1;

                                    return (
                                        <Marker
                                            key={`entrega-${parada.ordem}`}
                                            coordinate={
                                                coordenada
                                            }
                                            title={`Entrega ${numeroEntrega}`}
                                            description={
                                                parada.enderecoFormatado
                                            }
                                        >
                                            <View
                                                style={
                                                    styles.deliveryMarker
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.deliveryMarkerText
                                                    }
                                                >
                                                    {
                                                        numeroEntrega
                                                    }
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
                                carregar o
                                mapa.
                            </Text>
                        </View>
                    )}
                </View>

                    {/* RESUMO */}

                <View
                    style={
                        styles.infoContainer
                    }
                >
                    {/* DISTÂNCIA */}

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
                            {resultado.distanciaTotalKm.toFixed(
                                1
                            )}{" "}
                            km
                        </Text>
                    </View>

                    {/* TEMPO */}

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

                    {/* CONSUMO */}

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
                            {resultado.litrosConsumidos.toFixed(
                                2
                            )}{" "}
                            L
                        </Text>
                    </View>

                    {/* CUSTO */}

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
                            {resultado.custoEstimadoCombustivel.toFixed(
                                2
                            )}
                        </Text>
                    </View>
                </View>

                {/* ORDEM DAS PARADAS */}

                <View
                    style={
                        styles.stopsContainer
                    }
                >
                    <Text
                        style={
                            styles.stopsTitle
                        }
                    >
                        Ordem das paradas
                    </Text>

                    <Text
                        style={
                            styles.stopsSubtitle
                        }
                    >
                        Siga esta sequência para
                        realizar a rota otimizada.
                    </Text>

                    <View
                        style={
                            styles.timeline
                        }
                    >
                        {resultado.rotaOrdenada.map(
                            (
                                parada,
                                index
                            ) => {
                                const isLast =
                                    index ===
                                    resultado
                                        .rotaOrdenada
                                        .length -
                                    1;

                                const numeroEntrega =
                                    resultado.rotaOrdenada
                                        .filter(
                                            (
                                                item
                                            ) =>
                                                item.tipo ===
                                                "ENTREGA"
                                        )
                                        .findIndex(
                                            (
                                                item
                                            ) =>
                                                item.ordem ===
                                                parada.ordem
                                        ) + 1;

                                return (
                                    <View
                                        key={`stop-${parada.ordem}-${index}`}
                                        style={
                                            styles.stopItem
                                        }
                                    >
                                        {/* LINHA */}

                                        {!isLast && (
                                            <View
                                                style={
                                                    styles.timelineLine
                                                }
                                            />
                                        )}

                                        {/* ÍCONE */}

                                        <View
                                            style={[
                                                styles.stopIcon,
                                                parada.tipo ===
                                                "ORIGEM" &&
                                                styles.stopIconOrigin,
                                                parada.tipo ===
                                                "ENTREGA" &&
                                                styles.stopIconDelivery,
                                                parada.tipo ===
                                                "DESTINO_FINAL" &&
                                                styles.stopIconDestination,
                                            ]}
                                        >
                                            {parada.tipo ===
                                                "ORIGEM" ? (
                                                <FontAwesome6
                                                    name="location-dot"
                                                    size={
                                                        15
                                                    }
                                                    color={
                                                        colors.white
                                                    }
                                                />
                                            ) : parada.tipo ===
                                                "DESTINO_FINAL" ? (
                                                <FontAwesome6
                                                    name="flag-checkered"
                                                    size={
                                                        14
                                                    }
                                                    color={
                                                        colors.white
                                                    }
                                                />
                                            ) : (
                                                <Text
                                                    style={
                                                        styles.stopNumber
                                                    }
                                                >
                                                    {
                                                        numeroEntrega
                                                    }
                                                </Text>
                                            )}
                                        </View>

                                        {/* INFORMAÇÕES */}

                                        <View
                                            style={
                                                styles.stopContent
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.stopTitle
                                                }
                                            >
                                                {parada.tipo ===
                                                    "ORIGEM"
                                                    ? "Origem"
                                                    : parada.tipo ===
                                                        "DESTINO_FINAL"
                                                        ? "Destino final"
                                                        : `Entrega ${numeroEntrega}`}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.stopAddress
                                                }
                                            >
                                                {
                                                    parada.enderecoFormatado
                                                }
                                            </Text>

                                            {parada.destinatario && (
                                                <Text
                                                    style={
                                                        styles.stopRecipient
                                                    }
                                                >
                                                    {
                                                        parada.destinatario
                                                    }
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                );
                            }
                        )}
                    </View>
                </View>

                    {/* BOTÃO INICIAR ROTA */}

                <TouchableOpacity
                    style={
                        styles.startButton
                    }
                    onPress={
                        handleStartRoute
                    }
                    activeOpacity={0.8}
                >
                    <FontAwesome6
                        name="location-arrow"
                        size={18}
                        color={
                            colors.white
                        }
                    />

                    <Text
                        style={
                            styles.startButtonText
                        }
                    >
                        Iniciar rota
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}