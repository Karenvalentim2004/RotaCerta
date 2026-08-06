import { SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { getGreeting } from "../../utils/getGreeting";
import { RootTabParamList } from "../../@types/navigation";

import { styles } from "./styles";

export function Home() {
    const navigation =
        useNavigation<BottomTabNavigationProp<RootTabParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Header
                    greeting={getGreeting()}
                    title="O que deseja fazer hoje?"
                />

                <Card
                    title="Nova rota"
                    description="Crie uma rota otimizando tempo e distância."
                    icon="add-circle-outline"
                    highlighted
                    large
                    onPress={() => navigation.navigate("Rotas")}
                />

                <Card
                    title="Rotas Salvas"
                    description="Veja e gerencie suas rotas."
                    icon="folder-open-outline"
                />

                <Card
                    title="Histórico"
                    description="Acompanhe suas rotas realizadas."
                    icon="time-outline"
                />

                <Card
                    title="Favoritos"
                    description="Suas rotas favoritas."
                    icon="star-outline"
                />
            </ScrollView>
        </SafeAreaView>
    );
}