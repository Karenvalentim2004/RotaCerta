import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";

import { useState, useEffect } from "react";

import {
    useNavigation,
} from "@react-navigation/native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    Vehicle,
} from "@/services/vehicleService";

import { colors } from "@/theme/colors";
import { styles } from "./styles";


export function Vehicles() {

    const navigation =
        useNavigation();


    // ==========================================
    // STATES
    // ==========================================

    const [vehicles, setVehicles] =
        useState<Vehicle[]>([]);

    const [formVisible, setFormVisible] =
        useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [tipo, setTipo] =
        useState("Moto");

    const [modelo, setModelo] =
        useState("");

    const [consumo, setConsumo] =
        useState("");

    const [combustivel, setCombustivel] =
        useState("Gasolina");

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // CARREGAR VEÍCULOS
    // ==========================================

    useEffect(() => {

        loadVehicles();

    }, []);


    async function loadVehicles() {

        try {

            setLoading(true);

            const savedVehicles =
                await getVehicles();

            setVehicles(
                savedVehicles
            );

        } catch (error) {

            console.error(
                "❌ Erro ao carregar veículos:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível carregar seus veículos."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // LIMPAR FORMULÁRIO
    // ==========================================

    function clearForm() {

        setTipo("Moto");

        setModelo("");

        setConsumo("");

        setCombustivel("Gasolina");

        setEditingId(null);

        setFormVisible(false);

    }


    // ==========================================
    // EDITAR VEÍCULO
    // ==========================================

    function handleEditVehicle(
        vehicle: Vehicle
    ) {

        setEditingId(
            vehicle.id
        );

        setTipo(
            vehicle.tipo
        );

        setModelo(
            vehicle.modelo
        );

        setConsumo(
            String(vehicle.consumo)
        );

        setCombustivel(
            vehicle.combustivel
        );

        setFormVisible(true);

    }


    // ==========================================
    // SALVAR VEÍCULO
    // ==========================================

    async function handleSaveVehicle() {

        if (!modelo.trim()) {

            Alert.alert(
                "Campos obrigatórios",
                "Informe o modelo do veículo."
            );

            return;

        }


        if (!consumo.trim()) {

            Alert.alert(
                "Campos obrigatórios",
                "Informe o consumo do veículo."
            );

            return;

        }


        const consumoNumerico =
            Number(
                consumo.replace(",", ".")
            );


        if (
            !Number.isFinite(
                consumoNumerico
            ) ||
            consumoNumerico <= 0
        ) {

            Alert.alert(
                "Consumo inválido",
                "Informe um consumo válido, por exemplo: 35."
            );

            return;

        }


        try {

            setLoading(true);


            // ==========================================
            // NOVO VEÍCULO
            // ==========================================

            if (!editingId) {

                const novoVeiculo =
                    await createVehicle(
                        tipo,
                        modelo.trim(),
                        consumoNumerico,
                        combustivel
                    );


                setVehicles(
                    current => [
                        novoVeiculo,
                        ...current,
                    ]
                );


                Alert.alert(
                    "Sucesso",
                    "Veículo cadastrado com sucesso!"
                );


                clearForm();

                return;

            }


            // ==========================================
            // EDITAR VEÍCULO
            // ==========================================

            const veiculoAtualizado =
                await updateVehicle(
                    editingId,
                    tipo,
                    modelo.trim(),
                    consumoNumerico,
                    combustivel
                );


            setVehicles(
                current =>
                    current.map(
                        vehicle =>
                            vehicle.id === editingId
                                ? veiculoAtualizado
                                : vehicle
                    )
            );


            Alert.alert(
                "Sucesso",
                "Veículo atualizado com sucesso!"
            );


            clearForm();

        } catch (error: any) {

            console.error(
                "❌ Erro ao salvar veículo:",
                error
            );

            Alert.alert(
                "Erro",
                error?.message ||
                "Não foi possível salvar o veículo."
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // REMOVER VEÍCULO
    // ==========================================

    function handleRemoveVehicle(
        id: number
    ) {

        Alert.alert(
            "Excluir veículo",
            "Tem certeza que deseja excluir este veículo?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },

                {
                    text: "Excluir",
                    style: "destructive",

                    onPress: async () => {

                        try {

                            setLoading(true);


                            await deleteVehicle(
                                id
                            );


                            setVehicles(
                                current =>
                                    current.filter(
                                        vehicle =>
                                            vehicle.id !== id
                                    )
                            );


                            Alert.alert(
                                "Sucesso",
                                "Veículo excluído com sucesso!"
                            );

                        } catch (error: any) {

                            console.error(
                                "❌ Erro ao excluir veículo:",
                                error
                            );

                            Alert.alert(
                                "Erro",
                                error?.message ||
                                "Não foi possível excluir o veículo."
                            );

                        } finally {

                            setLoading(false);

                        }

                    },
                },
            ]
        );

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <SafeAreaView
            style={
                styles.container
            }
        >

            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
            >

                {/* ========================================== */}
                {/* CABEÇALHO */}
                {/* ========================================== */}

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
                            name="arrow-back"
                            size={28}
                            color={
                                colors.black
                            }
                        />

                    </TouchableOpacity>


                    <View
                        style={
                            styles.headerText
                        }
                    >

                        <Text
                            style={
                                styles.title
                            }
                        >
                            Meus Veículos
                        </Text>


                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            Configure os veículos usados
                            nas suas rotas.
                        </Text>

                    </View>

                </View>


                {/* ========================================== */}
                {/* CARREGANDO */}
                {/* ========================================== */}

                {loading &&
                    vehicles.length === 0 && (

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            Carregando veículos...
                        </Text>

                    )}


                {/* ========================================== */}
                {/* LISTA VAZIA */}
                {/* ========================================== */}

                {!loading &&
                    vehicles.length === 0 &&
                    !formVisible && (

                        <Text
                            style={
                                styles.emptyText
                            }
                        >
                            Nenhum veículo cadastrado.
                        </Text>

                    )}


                {/* ========================================== */}
                {/* LISTA DE VEÍCULOS */}
                {/* ========================================== */}

                {vehicles.map(
                    vehicle => (

                        <View
                            key={
                                vehicle.id
                            }
                            style={
                                styles.vehicleCard
                            }
                        >

                            {/* ÍCONE */}

                            <View
                                style={
                                    styles.vehicleIconContainer
                                }
                            >

                                <FontAwesome6
                                    name={
                                        vehicle.tipo
                                            .toLowerCase() ===
                                            "moto"
                                            ? "motorcycle"
                                            : "car"
                                    }
                                    size={26}
                                    color={
                                        colors.green[700]
                                    }
                                />

                            </View>


                            {/* INFORMAÇÕES */}

                            <View
                                style={
                                    styles.vehicleContent
                                }
                            >

                                <Text
                                    style={
                                        styles.vehicleType
                                    }
                                >
                                    {
                                        vehicle.tipo
                                    }
                                </Text>


                                <Text
                                    style={
                                        styles.vehicleModel
                                    }
                                >
                                    Modelo:{" "}
                                    {
                                        vehicle.modelo
                                    }
                                </Text>


                                <View
                                    style={
                                        styles.vehicleDetails
                                    }
                                >

                                    <View>

                                        <Text
                                            style={
                                                styles.detailLabel
                                            }
                                        >
                                            Consumo
                                        </Text>


                                        <Text
                                            style={
                                                styles.detailValue
                                            }
                                        >
                                            {
                                                vehicle.consumo
                                            }{" "}
                                            km/L
                                        </Text>

                                    </View>


                                    <View>

                                        <Text
                                            style={
                                                styles.detailLabel
                                            }
                                        >
                                            Combustível
                                        </Text>


                                        <Text
                                            style={
                                                styles.detailValue
                                            }
                                        >
                                            {
                                                vehicle.combustivel
                                            }
                                        </Text>

                                    </View>

                                </View>

                            </View>


                            {/* ========================================== */}
                            {/* AÇÕES */}
                            {/* ========================================== */}

                            <View
                                style={
                                    styles.actions
                                }
                            >

                                {/* EDITAR */}

                                <TouchableOpacity
                                    style={
                                        styles.editButton
                                    }
                                    onPress={() =>
                                        handleEditVehicle(
                                            vehicle
                                        )
                                    }
                                    disabled={
                                        loading
                                    }
                                >

                                    <Ionicons
                                        name="create-outline"
                                        size={21}
                                        color={
                                            colors.green[700]
                                        }
                                    />

                                </TouchableOpacity>


                                {/* EXCLUIR */}

                                <TouchableOpacity
                                    style={
                                        styles.deleteButton
                                    }
                                    onPress={() =>
                                        handleRemoveVehicle(
                                            vehicle.id
                                        )
                                    }
                                    disabled={
                                        loading
                                    }
                                >

                                    <Text
                                        style={
                                            styles.deleteText
                                        }
                                    >
                                        ×
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    )
                )}


                {/* ========================================== */}
                {/* FORMULÁRIO */}
                {/* ========================================== */}

                {formVisible && (

                    <View
                        style={
                            styles.formContainer
                        }
                    >

                        <Text
                            style={
                                styles.formTitle
                            }
                        >
                            {editingId
                                ? "Editar veículo"
                                : "Novo veículo"}
                        </Text>


                        {/* ========================================== */}
                        {/* TIPO */}
                        {/* ========================================== */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Tipo
                        </Text>


                        <View
                            style={
                                styles.typeContainer
                            }
                        >

                            {/* MOTO */}

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,

                                    tipo === "Moto" &&
                                    styles.typeButtonSelected,
                                ]}
                                onPress={() =>
                                    setTipo(
                                        "Moto"
                                    )
                                }
                            >

                                <FontAwesome6
                                    name="motorcycle"
                                    size={18}
                                    color={
                                        tipo === "Moto"
                                            ? colors.white
                                            : colors.gray[700]
                                    }
                                />


                                <Text
                                    style={[
                                        styles.typeText,

                                        tipo === "Moto" &&
                                        styles.typeTextSelected,
                                    ]}
                                >
                                    Moto
                                </Text>

                            </TouchableOpacity>


                            {/* CARRO */}

                            <TouchableOpacity
                                style={[
                                    styles.typeButton,

                                    tipo === "Carro" &&
                                    styles.typeButtonSelected,
                                ]}
                                onPress={() =>
                                    setTipo(
                                        "Carro"
                                    )
                                }
                            >

                                <FontAwesome6
                                    name="car"
                                    size={18}
                                    color={
                                        tipo === "Carro"
                                            ? colors.white
                                            : colors.gray[700]
                                    }
                                />


                                <Text
                                    style={[
                                        styles.typeText,

                                        tipo === "Carro" &&
                                        styles.typeTextSelected,
                                    ]}
                                >
                                    Carro
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* ========================================== */}
                        {/* MODELO */}
                        {/* ========================================== */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Modelo
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Ex: Fan 160"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            value={
                                modelo
                            }
                            onChangeText={
                                setModelo
                            }
                        />


                        {/* ========================================== */}
                        {/* CONSUMO */}
                        {/* ========================================== */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Consumo médio
                        </Text>


                        <TextInput
                            style={
                                styles.input
                            }
                            placeholder="Ex: 35"
                            placeholderTextColor={
                                colors.gray[500]
                            }
                            keyboardType="decimal-pad"
                            value={
                                consumo
                            }
                            onChangeText={
                                setConsumo
                            }
                        />


                        {/* ========================================== */}
                        {/* COMBUSTÍVEL */}
                        {/* ========================================== */}

                        <Text
                            style={
                                styles.label
                            }
                        >
                            Combustível
                        </Text>


                        <View
                            style={
                                styles.typeContainer
                            }
                        >

                            {[
                                "Gasolina",
                                "Etanol",
                                "Diesel",
                            ].map(
                                item => (

                                    <TouchableOpacity
                                        key={
                                            item
                                        }
                                        style={[
                                            styles.fuelButton,

                                            combustivel ===
                                            item &&
                                            styles.fuelButtonSelected,
                                        ]}
                                        onPress={() =>
                                            setCombustivel(
                                                item
                                            )
                                        }
                                    >

                                        <Text
                                            style={[
                                                styles.fuelText,

                                                combustivel ===
                                                item &&
                                                styles.fuelTextSelected,
                                            ]}
                                        >
                                            {
                                                item
                                            }
                                        </Text>

                                    </TouchableOpacity>

                                )
                            )}

                        </View>


                        {/* ========================================== */}
                        {/* SALVAR */}
                        {/* ========================================== */}

                        <TouchableOpacity
                            style={
                                styles.saveButton
                            }
                            onPress={
                                handleSaveVehicle
                            }
                            disabled={
                                loading
                            }
                        >

                            <Text
                                style={
                                    styles.saveButtonText
                                }
                            >
                                {loading
                                    ? "Salvando..."
                                    : editingId
                                        ? "Salvar alterações"
                                        : "Salvar veículo"}
                            </Text>

                        </TouchableOpacity>


                        {/* ========================================== */}
                        {/* CANCELAR */}
                        {/* ========================================== */}

                        <TouchableOpacity
                            style={
                                styles.cancelButton
                            }
                            onPress={
                                clearForm
                            }
                            disabled={
                                loading
                            }
                        >

                            <Text
                                style={
                                    styles.cancelText
                                }
                            >
                                Cancelar
                            </Text>

                        </TouchableOpacity>

                    </View>

                )}


                {/* ========================================== */}
                {/* ADICIONAR */}
                {/* ========================================== */}

                {!formVisible && (

                    <TouchableOpacity
                        style={
                            styles.addButton
                        }
                        onPress={() => {

                            setEditingId(
                                null
                            );

                            setTipo(
                                "Moto"
                            );

                            setModelo(
                                ""
                            );

                            setConsumo(
                                ""
                            );

                            setCombustivel(
                                "Gasolina"
                            );

                            setFormVisible(
                                true
                            );

                        }}
                        disabled={
                            loading
                        }
                    >

                        <Text
                            style={
                                styles.addButtonText
                            }
                        >
                            + Adicionar veículo
                        </Text>

                    </TouchableOpacity>

                )}

            </ScrollView>

        </SafeAreaView>

    );

}