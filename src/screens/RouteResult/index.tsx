import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { useEffect, useState } from "react";

import * as Location from "expo-location";

import MapView, {
    Marker,
    Polyline,
    Region,
} from "react-native-maps";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/navigation";

import { colors } from "@/theme/colors";

import { styles } from "./styles";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "RouteResult"
>;

interface RouteCoordinate {
    ordem: number;
    tipo: string;
    enderecoFormatado: string;
    destinatario?: string | null;
    latitude: number;
    longitude: number;
}

export function RouteResult({ route }: Props) {
    const resultado = route.params.route;

    const [coordinates, setCoordinates] =
        useState<RouteCoordinate[]>([]);

    const [loadingMap, setLoadingMap] =
        useState(true);

    const [mapRegion, setMapRegion] =
        useState<Region | null>(null);

    // =========================
    // TEMPO
    // =========================

    const quantidadeEntregas =
        resultado.rotaOrdenada.filter(
            (parada) => parada.tipo === "ENTREGA"
        ).length;

    const tempoEstimado =
        quantidadeEntregas * 5;

    // =========================
    // GEOCODIFICAR ENDEREÇOS
    // =========================

    useEffect(() => {
        async function loadCoordinates() {
            try {
                setLoadingMap(true);

                const resultadoCoordenadas: RouteCoordinate[] =
                    [];

                for (const parada of resultado.rotaOrdenada) {
                    try {
                        const locations =
                            await Location.geocodeAsync(
                                parada.enderecoFormatado
                            );

                        if (locations.length > 0) {
                            const location =
                                locations[0];

                            resultadoCoordenadas.push({
                                ordem: parada.ordem,
                                tipo: parada.tipo,
                                enderecoFormatado:
                                    parada.enderecoFormatado,
                                destinatario:
                                    parada.destinatario,
                                latitude:
                                    location.latitude,
                                longitude:
                                    location.longitude,
                            });
                        } else {
                            console.log(
                                "Endereço não localizado:",
                                parada.enderecoFormatado
                            );
                        }
                    } catch (error) {
                        console.log(
                            "Erro ao localizar endereço:",
                            parada.enderecoFormatado,
                            error
                        );
                    }
                }

                setCoordinates(
                    resultadoCoordenadas
                );

                if (
                    resultadoCoordenadas.length > 0
                ) {
                    const primeira =
                        resultadoCoordenadas[0];

                    setMapRegion({
                        latitude:
                            primeira.latitude,
                        longitude:
                            primeira.longitude,
                        latitudeDelta: 0.08,
                        longitudeDelta: 0.08,
                    });
                }
            } catch (error) {
                console.error(
                    "Erro ao carregar mapa:",
                    error
                );
            } finally {
                setLoadingMap(false);
            }
        }

        loadCoordinates();
    }, [resultado]);

    // =========================
    // POLYLINE
    // =========================

    const routeCoordinates =
        coordinates.map((point) => ({
            latitude: point.latitude,
            longitude: point.longitude,
        }));

    // =========================
    // RENDER
    // =========================

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                {/* TÍTULO */}

                <Text style={styles.title}>
                    Rota otimizada
                </Text>

                <Text style={styles.subtitle}>
                    Confira o percurso antes de
                    iniciar sua rota.
                </Text>

                {/* MAPA */}

                <View
                    style={
                        styles.mapContainer
                    }
                >
                    {loadingMap ? (
                        <View
                            style={
                                styles.mapLoading
                            }
                        >
                            <ActivityIndicator
                                size="large"
                                color={
                                    colors.green[700]
                                }
                            />

                            <Text
                                style={
                                    styles.mapLoadingText
                                }
                            >
                                Carregando mapa...
                            </Text>
                        </View>
                    ) : mapRegion ? (
                        <MapView
                            style={
                                styles.map
                            }
                            initialRegion={
                                mapRegion
                            }
                        >
                            {/* LINHA DA ROTA */}

                            {routeCoordinates.length >
                                1 && (
                                    <Polyline
                                        coordinates={
                                            routeCoordinates
                                        }
                                        strokeWidth={4}
                                        strokeColor={
                                            colors.green[700]
                                        }
                                    />
                                )}

                            {/* MARCADORES */}

                            {coordinates.map(
                                (point) => (
                                    <Marker
                                        key={`${point.ordem}-${point.tipo}`}
                                        coordinate={{
                                            latitude:
                                                point.latitude,
                                            longitude:
                                                point.longitude,
                                        }}
                                        title={
                                            point.tipo ===
                                                "ORIGEM"
                                                ? "Origem"
                                                : point.tipo ===
                                                    "DESTINO_FINAL"
                                                    ? "Destino final"
                                                    : `Entrega ${point.ordem}`
                                        }
                                        description={
                                            point.enderecoFormatado
                                        }
                                    />
                                )
                            )}
                        </MapView>
                    ) : (
                        <View
                            style={
                                styles.mapLoading
                            }
                        >
                            <Text
                                style={
                                    styles.mapLoadingText
                                }
                            >
                                Não foi possível
                                localizar os endereços.
                            </Text>
                        </View>
                    )}
                </View>

                {/* INFORMAÇÕES */}

                <View
                    style={
                        styles.infoContainer
                    }
                >
                    <View
                        style={styles.infoCard}
                    >
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

                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            Distância total
                        </Text>
                    </View>

                    <View
                        style={styles.infoCard}
                    >
                        <Text
                            style={
                                styles.infoValue
                            }
                        >
                            {tempoEstimado} min
                        </Text>

                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            Tempo estimado
                        </Text>
                    </View>

                    <View
                        style={styles.infoCard}
                    >
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

                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            Consumo estimado
                        </Text>
                    </View>

                    <View
                        style={styles.infoCard}
                    >
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

                        <Text
                            style={
                                styles.infoLabel
                            }
                        >
                            Custo estimado
                        </Text>
                    </View>
                </View>

                {/* RESUMO */}

                <View
                    style={
                        styles.summaryContainer
                    }
                >
                    <Text
                        style={
                            styles.summaryTitle
                        }
                    >
                        Resumo da rota
                    </Text>

                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        {resultado.resumoRota}
                    </Text>
                </View>

                {/* ORDEM DA ROTA */}

                <View
                    style={
                        styles.routeContainer
                    }
                >
                    <Text
                        style={
                            styles.routeTitle
                        }
                    >
                        Ordem da rota
                    </Text>

                    {resultado.rotaOrdenada.map(
                        (parada) => (
                            <View
                                key={`${parada.ordem}-${parada.tipo}`}
                                style={
                                    styles.routeItem
                                }
                            >
                                <View
                                    style={
                                        styles.routeNumber
                                    }
                                >
                                    <Text
                                        style={
                                            styles.routeNumberText
                                        }
                                    >
                                        {
                                            parada.ordem
                                        }
                                    </Text>
                                </View>

                                <View
                                    style={
                                        styles.routeContent
                                    }
                                >
                                    <Text
                                        style={
                                            styles.routeType
                                        }
                                    >
                                        {parada.tipo ===
                                            "ORIGEM"
                                            ? "Ponto de partida"
                                            : parada.tipo ===
                                                "DESTINO_FINAL"
                                                ? "Destino final"
                                                : "Entrega"}
                                    </Text>

                                    <Text
                                        style={
                                            styles.routeAddress
                                        }
                                    >
                                        {
                                            parada.enderecoFormatado
                                        }
                                    </Text>

                                    {parada.destinatario && (
                                        <Text
                                            style={
                                                styles.destinationText
                                            }
                                        >
                                            {
                                                parada.destinatario
                                            }
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )
                    )}
                </View>

                {/* BOTÃO */}

                <TouchableOpacity
                    style={
                        styles.startButton
                    }
                    onPress={() => {
                        console.log(
                            "🚀 Iniciar rota"
                        );
                    }}
                >
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