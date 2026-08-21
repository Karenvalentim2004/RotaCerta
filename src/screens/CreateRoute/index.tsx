import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";

import { useEffect, useState } from "react";

import {
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { OptionCard } from "@/components/OptionCard";
import { CameraModal } from "@/components/CameraModal";

import {
    analyzeImage,
    AnalyzedAddress,
} from "@/services/analyzeImage";

import {
    optimizeRoute,
} from "@/services/optimizeRoute";

import {
    getVehicles,
    Vehicle,
} from "@/services/vehicleStorage";

import {
    RootStackParamList,
} from "@/navigation";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

// TIPAGEM DA NAVEGAÇÃO

type NavigationProps =
    NativeStackNavigationProp<
        RootStackParamList
    >;

// COMPONENTE

export function CreateRoute() {

    const navigation =
        useNavigation<NavigationProps>();

    // STATES

    const [cameraVisible, setCameraVisible] =
        useState(false);

    const [manualVisible, setManualVisible] =
        useState(false);

    const [destinos, setDestinos] =
        useState<AnalyzedAddress[]>([]);

    const [origem, setOrigem] =
        useState("");

    const [destinoFinal, setDestinoFinal] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [vehicles, setVehicles] =
        useState<Vehicle[]>([]);

    const [selectedVehicle, setSelectedVehicle] =
        useState<Vehicle | null>(null);

    const [manualAddress, setManualAddress] =
        useState({
            rua: "",
            numero: "",
            bairro: "",
            cidade: "",
            estado: "",
            complemento: "",
        });

    // CARREGAR VEÍCULOS

    useEffect(() => {

        async function loadVehicles() {

            try {

                const savedVehicles =
                    await getVehicles();

                setVehicles(
                    savedVehicles
                );

                if (
                    savedVehicles.length > 0
                ) {

                    setSelectedVehicle(
                        savedVehicles[0]
                    );

                }

            } catch (error) {

                console.error(
                    "❌ Erro ao carregar veículos:",
                    error
                );

            }

        }

        loadVehicles();

    }, []);

    // FOTO

    function handleTakePhoto() {

        setCameraVisible(true);

    }

    // ENDEREÇO MANUAL

    function handleTypeAddress() {

        setManualVisible(true);

    }


    function handleAddManualAddress() {

        if (
            !manualAddress.rua.trim() ||
            !manualAddress.numero.trim() ||
            !manualAddress.cidade.trim()
        ) {

            Alert.alert(
                "Endereço incompleto",
                "Preencha pelo menos rua, número e cidade."
            );

            return;

        }


        const novoDestino: AnalyzedAddress = {

            destinatario: null,

            rua:
                manualAddress.rua.trim(),

            numero:
                manualAddress.numero.trim(),

            bairro:
                manualAddress.bairro.trim() ||
                null,

            cidade:
                manualAddress.cidade.trim(),

            estado:
                manualAddress.estado
                    .trim()
                    .toUpperCase() ||
                null,

            complemento:
                manualAddress.complemento.trim() ||
                null,

        };


        setDestinos(
            current => [
                ...current,
                novoDestino,
            ]
        );


        setManualAddress({
            rua: "",
            numero: "",
            bairro: "",
            cidade: "",
            estado: "",
            complemento: "",
        });


        setManualVisible(false);

    }

    // REMOVER DESTINO

    function handleRemoveDestination(
        index: number
    ) {

        setDestinos(
            current =>
                current.filter(
                    (_, i) =>
                        i !== index
                )
        );

    }

    // SELECIONAR VEÍCULO

    function handleSelectVehicle() {

        if (vehicles.length === 0) {

            Alert.alert(
                "Nenhum veículo cadastrado",
                "Cadastre um veículo antes de criar uma rota.",
                [
                    {
                        text: "OK",
                    },
                ]
            );

            return;

        }


        if (vehicles.length === 1) {

            setSelectedVehicle(
                vehicles[0]
            );

            return;

        }


        Alert.alert(
            "Selecionar veículo",
            "Escolha o veículo que será utilizado:",
            vehicles.map(
                vehicle => ({
                    text: `${vehicle.tipo} - ${vehicle.modelo}`,
                    onPress: () =>
                        setSelectedVehicle(
                            vehicle
                        ),
                })
            )
        );

    }

    // OTIMIZAR ROTA

    async function handleOptimizeRoute() {

        if (!origem.trim()) {

            Alert.alert(
                "Origem obrigatória",
                "Informe o endereço de origem."
            );

            return;

        }


        if (destinos.length === 0) {

            Alert.alert(
                "Nenhum destino",
                "Adicione pelo menos um endereço de entrega."
            );

            return;

        }


        if (!selectedVehicle) {

            Alert.alert(
                "Veículo não selecionado",
                "Cadastre e selecione um veículo antes de otimizar a rota."
            );

            return;

        }


        try {

            setLoading(true);


            console.log(
                "🚀 Iniciando otimização..."
            );

            console.log(
                "Origem:",
                origem
            );

            console.log(
                "Destinos:",
                destinos
            );

            console.log(
                "Destino final:",
                destinoFinal
            );

            console.log(
                "Veículo:",
                selectedVehicle
            );

            // CONFIGURAÇÃO DO VEÍCULO

            const valorCombustivel = 6.5;

            const kmPorLitro =
                Number(
                    selectedVehicle.consumo
                );

            // VALIDAR CONSUMO

            if (
                !kmPorLitro ||
                kmPorLitro <= 0
            ) {

                Alert.alert(
                    "Consumo inválido",
                    "O veículo selecionado possui um consumo inválido."
                );

                return;

            }

            // CHAMAR API

            const resultado =
                await optimizeRoute(
                    origem.trim(),
                    destinoFinal.trim(),
                    valorCombustivel,
                    kmPorLitro,
                    destinos
                );


            console.log(
                "✅ Rota otimizada:",
                resultado
            );

            // IR PARA RESULTADO

            navigation.navigate(
                "RouteResult",
                {
                    route: resultado,
                }
            );

        } catch (error) {

            console.error(
                "❌ Erro ao otimizar rota:",
                error
            );


            Alert.alert(
                "Erro",
                "Não foi possível otimizar a rota. Tente novamente."
            );

        } finally {

            setLoading(false);

        }

    }

    // RENDER

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

                <Text
                    style={styles.title}
                >
                    Nova Rota
                </Text>


                <Text
                    style={styles.subtitle}
                >
                    Adicione os endereços para
                    criar sua rota.
                </Text>

                {/* FORMAS DE ADICIONAR */}

                <View
                    style={
                        styles.optionsContainer
                    }
                >

                    <OptionCard
                        title="Fotografar etiqueta"
                        description="Tire uma foto da etiqueta e o app reconhecerá o endereço automaticamente."
                        icon="camera"
                        recommended
                        selected
                        onPress={
                            handleTakePhoto
                        }
                    />


                    <OptionCard
                        title="Digitar endereço"
                        description="Adicione o endereço manualmente."
                        icon="create-outline"
                        onPress={
                            handleTypeAddress
                        }
                    />

                </View>


                {/* FORMULÁRIO MANUAL */}

                {manualVisible && (

                    <View
                        style={
                            styles.manualContainer
                        }
                    >

                        <View
                            style={
                                styles.manualHeader
                            }
                        >

                            <Text
                                style={
                                    styles.manualTitle
                                }
                            >
                                Adicionar endereço
                            </Text>


                            <TouchableOpacity
                                onPress={() =>
                                    setManualVisible(
                                        false
                                    )
                                }
                            >

                                <Text
                                    style={
                                        styles.manualClose
                                    }
                                >
                                    ×
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* RUA */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Rua *
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Nome da rua"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            value={
                                manualAddress.rua
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            rua: text,
                                        })
                                    )
                            }
                        />


                        {/* NÚMERO */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Número *
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Número"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            keyboardType="numeric"
                            value={
                                manualAddress.numero
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            numero: text,
                                        })
                                    )
                            }
                        />


                        {/* BAIRRO */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Bairro
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Bairro"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            value={
                                manualAddress.bairro
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            bairro: text,
                                        })
                                    )
                            }
                        />


                        {/* CIDADE */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Cidade *
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Cidade"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            value={
                                manualAddress.cidade
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            cidade: text,
                                        })
                                    )
                            }
                        />


                        {/* ESTADO */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Estado
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Ex: SP"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            maxLength={2}
                            autoCapitalize="characters"
                            value={
                                manualAddress.estado
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            estado: text,
                                        })
                                    )
                            }
                        />


                        {/* COMPLEMENTO */}

                        <Text
                            style={
                                styles.fieldLabel
                            }
                        >
                            Complemento
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Apto, bloco, casa..."
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            value={
                                manualAddress.complemento
                            }
                            onChangeText={
                                text =>
                                    setManualAddress(
                                        current => ({
                                            ...current,
                                            complemento: text,
                                        })
                                    )
                            }
                        />


                        {/* ADICIONAR */}

                        <TouchableOpacity
                            style={
                                styles.addManualButton
                            }
                            onPress={
                                handleAddManualAddress
                            }
                        >

                            <Text
                                style={
                                    styles.addManualText
                                }
                            >
                                Adicionar endereço
                            </Text>

                        </TouchableOpacity>

                    </View>

                )}


                {/* ORIGEM */}

                <View
                    style={styles.section}
                >

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Endereço de origem
                    </Text>


                    <Text
                        style={
                            styles.sectionDescription
                        }
                    >
                        De onde você vai iniciar
                        a rota?
                    </Text>


                    <TextInput
                        style={
                            styles.input
                        }
                        placeholder="Ex: Rua São Paulo, 100 - Americana/SP"
                        placeholderTextColor={
                            colors.gray[500]
                        }
                        value={origem}
                        onChangeText={
                            setOrigem
                        }
                    />

                </View>

                {/* DESTINOS */}

                <View
                    style={styles.section}
                >

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Destinos
                    </Text>


                    <Text
                        style={
                            styles.sectionDescription
                        }
                    >
                        Endereços que serão
                        visitados durante a rota.
                    </Text>


                    {destinos.length === 0 ? (

                        <View
                            style={
                                styles.empty
                            }
                        >

                            <Text
                                style={
                                    styles.emptyText
                                }
                            >
                                Nenhum endereço
                                adicionado.
                            </Text>

                        </View>

                    ) : (

                        destinos.map(
                            (
                                destino,
                                index
                            ) => (

                                <View
                                    key={`${destino.rua}-${destino.numero}-${index}`}
                                    style={
                                        styles.destinationCard
                                    }
                                >

                                    <View
                                        style={
                                            styles.destinationContent
                                        }
                                    >

                                        <Text
                                            style={
                                                styles.destinationTitle
                                            }
                                        >
                                            📍{" "}
                                            {destino.rua ||
                                                "Endereço não identificado"}

                                            {destino.numero
                                                ? `, ${destino.numero}`
                                                : ""}
                                        </Text>


                                        <Text
                                            style={
                                                styles.destinationText
                                            }
                                        >

                                            {destino.bairro ||
                                                ""}

                                            {destino.bairro &&
                                                destino.cidade
                                                ? " - "
                                                : ""}

                                            {destino.cidade ||
                                                ""}

                                            {destino.estado
                                                ? `/${destino.estado}`
                                                : ""}

                                        </Text>


                                        {destino.destinatario && (

                                            <Text
                                                style={
                                                    styles.destinationText
                                                }
                                            >
                                                {
                                                    destino.destinatario
                                                }
                                            </Text>

                                        )}


                                        {destino.complemento && (

                                            <Text
                                                style={
                                                    styles.destinationText
                                                }
                                            >
                                                {
                                                    destino.complemento
                                                }
                                            </Text>

                                        )}

                                    </View>


                                    <TouchableOpacity
                                        onPress={() =>
                                            handleRemoveDestination(
                                                index
                                            )
                                        }
                                    >

                                        <Text
                                            style={
                                                styles.deleteButton
                                            }
                                        >
                                            🗑️
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            )
                        )

                    )}


                    <TouchableOpacity
                        onPress={
                            handleTakePhoto
                        }
                    >

                        <Text
                            style={
                                styles.addDestination
                            }
                        >
                            + Adicionar outro endereço
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* DESTINO FINAL */}

                <View
                    style={styles.section}
                >

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Destino final
                    </Text>


                    <Text
                        style={
                            styles.sectionDescription
                        }
                    >
                        Para onde você deseja
                        finalizar a rota?
                    </Text>


                    <TextInput
                        style={
                            styles.input
                        }
                        placeholder="Ex: Avenida Brasil, 500 - Americana/SP"
                        placeholderTextColor={
                            colors.gray[500]
                        }
                        value={
                            destinoFinal
                        }
                        onChangeText={
                            setDestinoFinal
                        }
                    />

                </View>

                {/* VEÍCULO */}

                <View
                    style={styles.section}
                >

                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Veículo
                    </Text>


                    <Text
                        style={
                            styles.sectionDescription
                        }
                    >
                        Selecione o veículo utilizado
                        na rota.
                    </Text>


                    <TouchableOpacity
                        style={
                            styles.vehicleCard
                        }
                        onPress={
                            handleSelectVehicle
                        }
                    >

                        <View
                            style={
                                styles.vehicleIconContainer
                            }
                        >

                            <FontAwesome6
                                name={
                                    selectedVehicle?.tipo?.toLowerCase() ===
                                        "carro"
                                        ? "car"
                                        : "motorcycle"
                                }
                                size={22}
                                color={
                                    colors.green[700]
                                }
                            />

                        </View>


                        <View
                            style={
                                styles.vehicleInfo
                            }
                        >

                            {selectedVehicle ? (

                                <>
                                    <Text
                                        style={
                                            styles.vehicleTitle
                                        }
                                    >
                                        {
                                            selectedVehicle.tipo
                                        }{" "}
                                        -{" "}
                                        {
                                            selectedVehicle.modelo
                                        }
                                    </Text>


                                    <Text
                                        style={
                                            styles.vehicleText
                                        }
                                    >
                                        Consumo:{" "}
                                        {
                                            selectedVehicle.consumo
                                        }{" "}
                                        km/L
                                    </Text>


                                    <Text
                                        style={
                                            styles.vehicleText
                                        }
                                    >
                                        Combustível:{" "}
                                        {
                                            selectedVehicle.combustivel
                                        }
                                    </Text>
                                </>

                            ) : (

                                <>
                                    <Text
                                        style={
                                            styles.vehicleTitle
                                        }
                                    >
                                        Nenhum veículo
                                    </Text>


                                    <Text
                                        style={
                                            styles.vehicleText
                                        }
                                    >
                                        Toque para cadastrar
                                        ou selecionar um veículo
                                    </Text>
                                </>

                            )}

                        </View>


                        <Text
                            style={
                                styles.vehicleArrow
                            }
                        >
                            ›
                        </Text>

                    </TouchableOpacity>

                </View>


                {/* OTIMIZAR */}

                <TouchableOpacity
                    style={[
                        styles.optimizeButton,
                        loading &&
                        styles.optimizeButtonDisabled,
                    ]}
                    onPress={
                        handleOptimizeRoute
                    }
                    disabled={
                        loading
                    }
                >

                    <Text
                        style={
                            styles.optimizeText
                        }
                    >
                        {loading
                            ? "Otimizando..."
                            : "Otimizar rota"}
                    </Text>

                </TouchableOpacity>

            </ScrollView>

            {/* CÂMERA */}

            <CameraModal
                visible={
                    cameraVisible
                }
                onClose={() =>
                    setCameraVisible(false)
                }
                onPhotoTaken={async (
                    uri
                ) => {

                    try {

                        console.log(
                            "📸 Foto confirmada:",
                            uri
                        );


                        const addresses =
                            await analyzeImage(
                                uri
                            );


                        console.log(
                            "📍 Endereços encontrados:",
                            addresses
                        );


                        if (
                            addresses.length === 0
                        ) {

                            Alert.alert(
                                "Endereço não encontrado",
                                "Não foi possível identificar um endereço nessa imagem."
                            );

                            return;

                        }


                        setDestinos(
                            current => [
                                ...current,
                                ...addresses,
                            ]
                        );


                        setCameraVisible(
                            false
                        );

                    } catch (error) {

                        console.error(
                            "❌ Erro ao analisar imagem:",
                            error
                        );


                        Alert.alert(
                            "Erro",
                            "Não foi possível analisar a imagem."
                        );

                    }

                }}
            />

        </SafeAreaView>

    );

}