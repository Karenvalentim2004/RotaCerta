import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import type { RootStackParamList } from "@/navigation";

import { colors } from "@/theme/colors";
import { styles } from "./styles";

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export function Profile() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList>
        >();

    return (
        <SafeAreaView style={styles.container}>
            {/* ÁREA VERDE DO PERFIL */}

            <View style={styles.profileHeader}>

                {/* VOLTAR */}

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={28}
                        color={colors.white}
                    />
                </TouchableOpacity>

                {/* USUÁRIO */}

                <View style={styles.userContainer}>

                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={42}
                            color={colors.white}
                        />
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>
                            Fulano da Silva
                        </Text>

                        <Text style={styles.userEmail}>
                            fulanodasilva@outlook.com
                        </Text>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => {
                                console.log(
                                    "Editar perfil"
                                );
                            }}
                        >
                            <Ionicons
                                name="create-outline"
                                size={16}
                                color={colors.white}
                            />

                            <Text
                                style={
                                    styles.editButtonText
                                }
                            >
                                Editar Perfil
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            {/* OPÇÕES */}

            <View style={styles.optionsContainer}>

                {/* MEUS VEÍCULOS */}

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                        navigation.navigate(
                            "Vehicles"
                        );
                    }}
                >
                    <View style={styles.optionIcon}>
                        <FontAwesome6
                            name="car-side"
                            size={25}
                            color={
                                colors.blue[900]
                            }
                        />
                    </View>

                    <Text style={styles.optionText}>
                        Meus Veículos
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={23}
                        color={
                            colors.blue[900]
                        }
                    />
                </TouchableOpacity>

                {/* NOTIFICAÇÕES */}

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                        console.log(
                            "Ativar notificações"
                        );
                    }}
                >
                    <View style={styles.optionIcon}>
                        <Ionicons
                            name="notifications-outline"
                            size={27}
                            color={
                                colors.blue[900]
                            }
                        />
                    </View>

                    <Text style={styles.optionText}>
                        Ative as Notificações
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={23}
                        color={
                            colors.blue[900]
                        }
                    />
                </TouchableOpacity>

                {/* SAIR */}

                <TouchableOpacity
                    style={[
                        styles.option,
                        styles.lastOption,
                    ]}
                    onPress={() => {
                        console.log(
                            "Sair da conta"
                        );
                    }}
                >
                    <View style={styles.optionIcon}>
                        <Ionicons
                            name="log-out-outline"
                            size={29}
                            color={
                                colors.blue[900]
                            }
                        />
                    </View>

                    <Text style={styles.optionText}>
                        Sair da Conta
                    </Text>

                    <Ionicons
                        name="chevron-forward"
                        size={23}
                        color={
                            colors.blue[900]
                        }
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}