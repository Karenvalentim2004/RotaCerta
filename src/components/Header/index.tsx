import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "../../theme/colors";

interface HeaderProps {
    greeting?: string;
    title: string;
}

export function Header({
    greeting,
    title,
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <View>
                {greeting && (
                    <Text style={styles.greeting}>
                        {greeting}
                    </Text>
                )}

                <Text style={styles.title}>
                    {title}
                </Text>
            </View>

            <View style={styles.avatar}>
                <Ionicons
                    name="person"
                    size={28}
                    color={colors.green[500]}
                />
            </View>
        </View>
    );
}