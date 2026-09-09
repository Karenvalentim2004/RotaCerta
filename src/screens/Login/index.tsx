import React, {
    useState,
} from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    useNavigation,
} from "@react-navigation/native";

import {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
    login,
} from "@/services/authService";

import styles from "./styles";

import {
    RootStackParamList,
} from "@/navigation";


type LoginNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        "Login"
    >;


export function Login() {

    const navigation =
        useNavigation<LoginNavigationProp>();


    // ==========================================
    // STATES
    // ==========================================

    const [email, setEmail] =
        useState("");

    const [senha, setSenha] =
        useState("");

    const [carregando, setCarregando] =
        useState(false);


    // ==========================================
    // LOGIN
    // ==========================================

    async function handleLogin() {

        if (!email.trim()) {

            Alert.alert(
                "Atenção",
                "Informe seu e-mail."
            );

            return;

        }


        if (!senha.trim()) {

            Alert.alert(
                "Atenção",
                "Informe sua senha."
            );

            return;

        }


        try {

            setCarregando(true);


            await login(
                email.trim(),
                senha
            );


            console.log(
                "✅ Login realizado com sucesso!"
            );


            navigation.replace(
                "Tabs"
            );


        } catch (error: any) {

            console.error(
                "❌ Erro no login:",
                error
            );


            Alert.alert(
                "Erro",
                error?.message ||
                "Não foi possível realizar o login."
            );


        } finally {

            setCarregando(false);

        }

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <KeyboardAvoidingView
            style={
                styles.container
            }
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >

            <View
                style={
                    styles.content
                }
            >

                <Text
                    style={
                        styles.title
                    }
                >
                    RotaCerta
                </Text>


                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Entre na sua conta
                </Text>


                <View
                    style={
                        styles.form
                    }
                >

                    {/* ========================================== */}
                    {/* E-MAIL */}
                    {/* ========================================== */}

                    <Text
                        style={
                            styles.label
                        }
                    >
                        E-mail
                    </Text>


                    <TextInput
                        style={
                            styles.input
                        }
                        value={
                            email
                        }
                        onChangeText={
                            setEmail
                        }
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />


                    {/* ========================================== */}
                    {/* SENHA */}
                    {/* ========================================== */}

                    <Text
                        style={
                            styles.label
                        }
                    >
                        Senha
                    </Text>


                    <TextInput
                        style={
                            styles.input
                        }
                        value={
                            senha
                        }
                        onChangeText={
                            setSenha
                        }
                        placeholder="Digite sua senha"
                        placeholderTextColor="#888"
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                    />


                    {/* ========================================== */}
                    {/* BOTÃO */}
                    {/* ========================================== */}

                    <TouchableOpacity
                        style={[
                            styles.button,

                            carregando &&
                            styles.buttonDisabled,
                        ]}
                        onPress={
                            handleLogin
                        }
                        disabled={
                            carregando
                        }
                    >

                        <Text
                            style={
                                styles.buttonText
                            }
                        >
                            {carregando
                                ? "Entrando..."
                                : "Entrar"}
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </KeyboardAvoidingView>

    );

}