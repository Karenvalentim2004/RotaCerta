import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Tabs } from "./Tabs";

import { RouteResult } from "@/screens/RouteResult";
import { Vehicles } from "@/screens/Vehicles";

export type RootStackParamList = {
    Tabs: undefined;

    RouteResult: {
        route: {
            distanciaTotalKm: number;
            custoEstimadoCombustivel: number;
            litrosConsumidos: number;
            resumoRota: string;

            rotaOrdenada: {
                ordem: number;
                tipo: string;
                enderecoFormatado: string;
                destinatario?: string | null;
            }[];
        };
    };

    Vehicles: undefined;
};

const Stack =
    createNativeStackNavigator<RootStackParamList>();

export function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />

                <Stack.Screen
                    name="RouteResult"
                    component={RouteResult}
                />

                <Stack.Screen
                    name="Vehicles"
                    component={Vehicles}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}