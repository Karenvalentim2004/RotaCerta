import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Share,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

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

    const resultado =
        route.params.route;

    // Conta somente as entregas
    const quantidadeEntregas =
        resultado.rotaOrdenada.filter(
            parada =>
                parada.tipo === "ENTREGA"
        ).length;

    const tempoParadas =
        quantidadeEntregas * 5;

    const tempoTotal =
        resultado.tempoDeslocamentoMinutos +
        tempoParadas;

    async function handleShare() {

        try {

            await Share.share({
                message:
                    `Rota otimizada\n\n` +
                    `Distância: ${resultado.distanciaTotalKm.toFixed(1)} km\n` +
                    `Tempo estimado: ${tempoEstimado} min\n` +
                    `Consumo: ${resultado.litrosConsumidos.toFixed(2)} L\n` +
                    `Custo estimado: R$ ${resultado.custoEstimadoCombustivel.toFixed(2)}`,
            });

        } catch (error) {

            console.error(
                "Erro ao compartilhar:",
                error
            );

        }
    }

    function handleStartRoute() {

        console.log(
            "🚀 Iniciando rota"
        );

        // Próxima etapa:
        // abrir a tela de rota em andamento
    }

    return (
        <SafeAreaView
            style={styles.container}
        >

            {/* CABEÇALHO */}

            <View
                style={styles.header}
            >

                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color={colors.black}
                    />

                </TouchableOpacity>


                <Text
                    style={styles.headerTitle}
                >
                    ROTA
                </Text>


                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={
                        handleShare
                    }
                >

                    <Ionicons
                        name="share-outline"
                        size={23}
                        color={colors.black}
                    />

                </TouchableOpacity>

            </View>


            {/* MAPA */}

            <View
                style={styles.mapContainer}
            >

                <Text
                    style={styles.mapText}
                >
                    MAPA DA ROTA
                </Text>

                <Text
                    style={styles.mapSubtext}
                >
                    {quantidadeEntregas}{" "}
                    {quantidadeEntregas === 1
                        ? "entrega"
                        : "entregas"}
                </Text>

            </View>


            {/* INFORMAÇÕES */}

            <View
                style={styles.infoContainer}
            >

                {/* DISTÂNCIA */}

                <View
                    style={styles.infoCard}
                >

                    <Text
                        style={styles.infoLabel}
                    >
                        Distância total
                    </Text>

                    <Text
                        style={styles.infoValue}
                    >
                        {resultado.distanciaTotalKm.toFixed(
                            1
                        )}{" "}
                        km
                    </Text>

                </View>


                {/* TEMPO */}

                <View
                    style={styles.infoCard}
                >

                    <Text
                        style={styles.infoLabel}
                    >
                        Tempo estimado
                    </Text>

                    <Text
                        style={styles.infoValue}
                    >
                        {tempoEstimado} min
                    </Text>

                </View>


                {/* CONSUMO */}

                <View
                    style={styles.infoCard}
                >

                    <Text
                        style={styles.infoLabel}
                    >
                        Consumo estimado
                    </Text>

                    <Text
                        style={styles.infoValue}
                    >
                        {resultado.litrosConsumidos.toFixed(
                            2
                        )}{" "}
                        L
                    </Text>

                </View>


                {/* CUSTO */}

                <View
                    style={styles.infoCard}
                >

                    <Text
                        style={styles.infoLabel}
                    >
                        Custo estimado
                    </Text>

                    <Text
                        style={styles.infoValue}
                    >
                        R${" "}
                        {resultado.custoEstimadoCombustivel.toFixed(
                            2
                        )}
                    </Text>

                </View>

            </View>


            {/* BOTÃO */}

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