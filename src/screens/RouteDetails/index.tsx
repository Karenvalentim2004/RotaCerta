import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
    "RouteDetails"
>;

export function RouteDetails({
    route,
    navigation,
}: Props) {

    // ROTA

    const resultado =
        route.params.route;

    // PARADAS

    const paradas: RoutePoint[] =
        resultado.rotaOrdenada ?? [];

    // ENTREGAS

    const quantidadeEntregas =
        paradas.filter(
            (parada: RoutePoint) =>
                parada.tipo === "ENTREGA"
        ).length;

    // DISTÂNCIA

    const distanciaTotal =
        resultado.distanciaTotalKm;

    // TEMPO

    const tempoDeslocamento =
        resultado.tempoDeslocamentoMinutos ?? 0;

    const tempoParadas =
        quantidadeEntregas * 5;

    const tempoTotal =
        tempoDeslocamento +
        tempoParadas;

    // VOLTAR

    function handleBack() {
        navigation.goBack();
    }

    // TELA

    return (
        <SafeAreaView
            style={styles.container}
        >

            {/* CABEÇALHO*/}

            <View
                style={styles.header}
            >

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >

                    <Ionicons
                        name="chevron-back"
                        size={30}
                        color={colors.black}
                    />

                </TouchableOpacity>

                <Text
                    style={styles.headerTitle}
                >
                    DETALHES DA ROTA
                </Text>

                <View
                    style={styles.headerSpacer}
                />

            </View>

            {/*CONTEÚDO*/}

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={
                    styles.scrollContent
                }
                showsVerticalScrollIndicator={
                    false
                }
            >

                {/*ORDEM DAS PARADAS*/}

                <View
                    style={
                        styles.timelineContainer
                    }
                >

                    {paradas.map(
                        (
                            parada: RoutePoint,
                            index: number
                        ) => {

                            const isLast =
                                index ===
                                paradas.length - 1;

                            // NÚMERO DA ENTREGA

                            const numeroEntrega =
                                paradas
                                    .slice(
                                        0,
                                        index + 1
                                    )
                                    .filter(
                                        (
                                            item: RoutePoint
                                        ) =>
                                            item.tipo ===
                                            "ENTREGA"
                                    )
                                    .length;

                            // TIPO DO PONTO

                            const isOrigem =
                                parada.tipo ===
                                "ORIGEM";

                            const isDestino =
                                parada.tipo ===
                                "DESTINO_FINAL";

                            // TÍTULO

                            const titulo =
                                isOrigem
                                    ? "Origem"
                                    : isDestino
                                    ? "Destino final"
                                    : `Entrega ${numeroEntrega}`;

                            return (
                                <View
                                    key={
                                        `detail-stop-${parada.ordem}-${index}`
                                    }
                                    style={
                                        styles.timelineItem
                                    }
                                >

                                    {/*LINHA*/}

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

                                            isOrigem &&
                                                styles.originIcon,

                                            isDestino &&
                                                styles.destinationIcon,

                                            !isOrigem &&
                                                !isDestino &&
                                                styles.deliveryIcon,
                                        ]}
                                    >

                                        {isOrigem ? (

                                            <FontAwesome6
                                                name="location-dot"
                                                size={14}
                                                color={
                                                    colors.white
                                                }
                                            />

                                        ) : isDestino ? (

                                            <FontAwesome6
                                                name="flag-checkered"
                                                size={13}
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

                                    {/*CONTEÚDO*/}

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
                                            {titulo}
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

                                        {/* DISTÂNCIA / TEMPO */}

                                        {!isOrigem && (
                                            <Text
                                                style={
                                                    styles.stopMetrics
                                                }
                                            >
                                                {(
                                                    resultado
                                                        .distanciaTotalKm *
                                                    (
                                                        index /
                                                        Math.max(
                                                            paradas.length -
                                                                1,
                                                            1
                                                        )
                                                    )
                                                ).toFixed(
                                                    1
                                                )}{" "}
                                                km
                                            </Text>
                                        )}

                                    </View>

                                </View>
                            );
                        }
                    )}

                </View>

                {/* RESUMO*/}

                <View
                    style={
                        styles.summaryContainer
                    }
                >

                    {/* DISTÂNCIA */}

                    <View
                        style={
                            styles.summaryCard
                        }
                    >

                        <Text
                            style={
                                styles.summaryLabel
                            }
                        >
                            Distância Restante
                        </Text>

                        <Text
                            style={
                                styles.summaryValue
                            }
                        >
                            {distanciaTotal.toFixed(
                                1
                            )}{" "}
                            km
                        </Text>

                    </View>

                    {/* TEMPO */}

                    <View
                        style={
                            styles.summaryCard
                        }
                    >

                        <Text
                            style={
                                styles.summaryLabel
                            }
                        >
                            Tempo Restante
                        </Text>

                        <Text
                            style={
                                styles.summaryValue
                            }
                        >
                            {tempoTotal >= 60
                                ? `${Math.floor(
                                      tempoTotal / 60
                                  )}h ${
                                      tempoTotal % 60
                                  } min`
                                : `${tempoTotal} min`}
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}