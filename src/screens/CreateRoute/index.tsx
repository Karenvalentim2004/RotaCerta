import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { Header } from "../../components/Header";
import { OptionCard } from "../../components/OptionCard";

import { styles } from "./styles";

export function CreateRoute() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Header style={styles.header}>
                    title="Nova Rota"
                </Header>

                <Text style={styles.subtitle}>
                    Como deseja adicionar os endereços?
                </Text>


                <View style={styles.optionsContainer}>
                    <OptionCard
                        title="Fotografar etiqueta"
                        description="Tire uma foto da etiqueta e o app reconhecerá o endereço automaticamente."
                        icon="camera"
                        recommended
                        selected
                        onPress={() => { }}
                    />

                    <OptionCard
                        title="Digitar endereço"
                        description="Adicione o endereço manualmente."
                        icon="create-outline"
                        onPress={() => { }}
                    />
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Destinos adicionados
                    </Text>

                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>
                            Nenhum endereço adicionado.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}