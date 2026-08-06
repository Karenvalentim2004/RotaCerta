import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Home } from "../screens/Home";
import { CreateRoute } from "../screens/CreateRoute";
import { History } from "../screens/History";
import { Profile } from "../screens/Profile";

import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: colors.green[500],

                tabBarInactiveTintColor: colors.gray[500],

                tabBarStyle: {
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Rotas"
                component={CreateRoute}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="navigate-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Histórico"
                component={History}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}