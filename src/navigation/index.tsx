import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { Tabs } from "./Tabs";
import { RouteResult } from "@/screens/RouteResult";
import { OptimizedRoute } from "@/services/optimizeRoute";

export type RootStackParamList = {
    Tabs: undefined;

    RouteResult: {
        route: OptimizedRoute;
    };
};

const Stack =
    createNativeStackNavigator<RootStackParamList>();
    MeusVeiculos: undefined;

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}