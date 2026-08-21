import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";

import {
    getVehicles,
    saveVehicles,
    Vehicle,
} from "@/services/vehicleStorage";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

export function Vehicles() {
    const navigation = useNavigation();

    const [vehicles, setVehicles] =
        useState<Vehicle[]>([]);

    const [formVisible, setFormVisible] =
        useState(false);

    // ID do veículo que está sendo editado
    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [tipo, setTipo] =
        useState("Moto");

    const [modelo, setModelo] =
        useState("");

    const [consumo, setConsumo] =
        useState("");

    const [combustivel, setCombustivel] =
        useState("Gasolina");

    // =========================
    // CARREGAR VEÍCULOS
    // =========================

    useEffect(() => {
        async function loadVehicles() {
            try {
                const savedVehicles =
                    await getVehicles();

                setVehicles(savedVehicles);
            } catch (error) {
                console.error(
                    "Erro ao carregar veículos:",
                    error
                );
            }
        }

        loadVehicles();
    }, []);

    // =========================
    // LIMPAR FORMULÁRIO
    // =========================

    function clearForm() {
        setTipo("Moto");
        setModelo("");
        setConsumo("");
        setCombustivel("Gasolina");
        setEditingId(null);
        setFormVisible(false);
    }

    // =========================
    // EDITAR VEÍCULO
    // =========================

    function handleEditVehicle(
        vehicle: Vehicle
    ) {
        setEditingId(vehicle.id);

        setTipo(vehicle.tipo);
        setModelo(vehicle.modelo);
        setConsumo(vehicle.consumo);
        setCombustivel(vehicle.combustivel);

        setFormVisible(true);
    }

    // =========================
    // SALVAR / EDITAR
    // =========================

    async function handleSaveVehicle() {
        if (
            !modelo.trim() ||
            !consumo.trim()
        ) {
            Alert.alert(
                "Campos obrigatórios",
                "Preencha o modelo e o consumo do veículo."
            );

            return;
        }

        try {
            // =========================
            // EDITANDO
            // =========================

            if (editingId) {
                const updatedVehicles =
                    vehicles.map((vehicle) => {

                        if (
                            vehicle.id ===
                            editingId
                        ) {
                            return {
                                ...vehicle,
                                tipo,
                                modelo:
                                    modelo.trim(),
                                consumo:
                                    consumo.trim(),
                                combustivel,
                            };
                        }

                        return vehicle;
                    });

                await saveVehicles(
                    updatedVehicles
                );

                setVehicles(
                    updatedVehicles
                );

                Alert.alert(
                    "Veículo atualizado",
                    "As informações do veículo foram atualizadas."
                );

                clearForm();

                return;
            }

            // =========================
            // NOVO VEÍCULO
            // =========================

            const newVehicle: Vehicle = {
                id: Date.now().toString(),
                tipo,
                modelo: modelo.trim(),
                consumo: consumo.trim(),
                combustivel,
            };

            const updatedVehicles = [
                ...vehicles,
                newVehicle,
            ];

            await saveVehicles(
                updatedVehicles
            );

            setVehicles(
                updatedVehicles
            );

            clearForm();

        } catch (error) {
            console.error(
                "Erro ao salvar veículo:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível salvar o veículo."
            );
        }
    }

    // =========================
    // REMOVER VEÍCULO
    // =========================

    function handleRemoveVehicle(
        id: string
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
                            const updatedVehicles =
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.id !==
                                        id
                                );

                            await saveVehicles(
                                updatedVehicles
                            );

                            setVehicles(
                                updatedVehicles
                            );
                        } catch (error) {
                            console.error(
                                "Erro ao excluir veículo:",
                                error
                            );
                        }
                    },
                },
            ]
        );
    }

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

                {/* ========================= */}
                {/* CABEÇALHO */}
                {/* ========================= */}

                <View style={styles.header}>

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

                {/* ========================= */}
                {/* LISTA DE VEÍCULOS */}
                {/* ========================= */}

                {vehicles.map(
                    (vehicle) => (

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
                                        vehicle.tipo ===
                                            "Moto"
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

                            {/* AÇÕES */}

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

                {/* ========================= */}
                {/* FORMULÁRIO */}
                {/* ========================= */}

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

                        {/* TIPO */}

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
                                    tipo ===
                                    "Moto" &&
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
                                        tipo ===
                                            "Moto"
                                            ? colors.white
                                            : colors.gray[700]
                                    }
                                />

                                <Text
                                    style={[
                                        styles.typeText,
                                        tipo ===
                                        "Moto" &&
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
                                    tipo ===
                                    "Carro" &&
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
                                        tipo ===
                                            "Carro"
                                            ? colors.white
                                            : colors.gray[700]
                                    }
                                />

                                <Text
                                    style={[
                                        styles.typeText,
                                        tipo ===
                                        "Carro" &&
                                        styles.typeTextSelected,
                                    ]}
                                >
                                    Carro
                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* MODELO */}

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
                            value={modelo}
                            onChangeText={
                                setModelo
                            }
                        />

                        {/* CONSUMO */}

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
                            value={consumo}
                            onChangeText={
                                setConsumo
                            }
                        />

                        {/* COMBUSTÍVEL */}

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
                                (item) => (

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

                        {/* SALVAR */}

                        <TouchableOpacity
                            style={
                                styles.saveButton
                            }
                            onPress={
                                handleSaveVehicle
                            }
                        >
                            <Text
                                style={
                                    styles.saveButtonText
                                }
                            >
                                {editingId
                                    ? "Salvar alterações"
                                    : "Salvar veículo"}
                            </Text>
                        </TouchableOpacity>

                        {/* CANCELAR */}

                        <TouchableOpacity
                            style={
                                styles.cancelButton
                            }
                            onPress={
                                clearForm
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

                {/* ========================= */}
                {/* ADICIONAR */}
                {/* ========================= */}

                {!formVisible && (

                    <TouchableOpacity
                        style={
                            styles.addButton
                        }
                        onPress={() => {
                            setEditingId(
                                null
                            );

                            setTipo("Moto");
                            setModelo("");
                            setConsumo("");
                            setCombustivel(
                                "Gasolina"
                            );

                            setFormVisible(
                                true
                            );
                        }}
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