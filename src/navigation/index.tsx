import React, {
    useEffect,
    useState,
} from "react";

import {
    ActivityIndicator,
    View,
} from "react-native";

import {
    NavigationContainer,
} from "@react-navigation/native";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Tabs } from "./Tabs";

import { Login } from "@/screens/Login";

import {
    RouteResult,
} from "@/screens/RouteResult";

import {
    RouteMap,
} from "@/screens/RouteMap";

import {
    Vehicles,
} from "@/screens/Vehicles";

import {
    isAuthenticated,
} from "@/services/authService";

import {
    OptimizedRoute,
} from "@/services/optimizeRoute";

import {
    colors,
} from "@/theme/colors";

// ==========================================
// TIPOS DE NAVEGAÇÃO
// ==========================================

export type RootStackParamList = {

    Login: undefined;

    Tabs: undefined;

    RouteResult: {
        route: OptimizedRoute;
    };

    Vehicles: undefined;

    RouteMap: {
        route: OptimizedRoute;
    };
};

// ==========================================
// STACK
// ==========================================

const Stack =
    createNativeStackNavigator<
        RootStackParamList
    >();

// ==========================================
// ROTAS
// ==========================================

export function Routes() {

    const [
        rotaInicial,
        setRotaInicial,
    ] = useState<
        "Login" | "Tabs" | null
    >(null);

    // ==========================================
    // VERIFICAR AUTENTICAÇÃO
    // ==========================================

    useEffect(() => {

        async function verificarLogin() {

            try {

                const autenticado =
                    await isAuthenticated();

                if (autenticado) {

                    console.log(
                        "Usuário autenticado. Abrindo Tabs."
                    );

                    setRotaInicial(
                        "Tabs"
                    );

                } else {

                    console.log(
                        "Usuário não autenticado. Abrindo Login."
                    );

                    setRotaInicial(
                        "Login"
                    );
                }

            } catch (error) {

                console.error(
                    "Erro ao verificar autenticação:",
                    error
                );

                setRotaInicial(
                    "Login"
                );
            }
        }

        verificarLogin();

    }, []);

    // ==========================================
    // CARREGANDO
    // ==========================================

    if (!rotaInicial) {

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor:
                        colors.gray[100],
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <ActivityIndicator
                    size="large"
                    color={
                        colors.blue[500]
                    }
                />

            </View>
        );
    }

    // ==========================================
    // NAVEGAÇÃO
    // ==========================================

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName={
                    rotaInicial
                }
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />

                <Stack.Screen
                    name="RouteResult"
                    component={
                        RouteResult
                    }
                />

                <Stack.Screen
                    name="Vehicles"
                    component={
                        Vehicles
                    }
                />

                <Stack.Screen
                    name="RouteMap"
                    component={
                        RouteMap
                    }
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}