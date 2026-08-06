import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "../../theme/colors";
import { ActionButton } from "../ActionButton";

interface CardProps {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    highlighted?: boolean;
    onPress?: () => void;
    large?: boolean;
}

export function Card({
    title,
    description,
    icon,
    highlighted = false,
    onPress,
    large = false,
}: CardProps) {
    return (
        <Pressable
            style={[
                styles.container,
                highlighted && styles.highlightedContainer,
                large && styles.largeContainer,
            ]}
            onPress={onPress}
        >
            <View>
                <Text
                    style={[
                        styles.title,
                        highlighted && styles.highlightedTitle,
                    ]}
                >
                    {title}
                </Text>

                <Text
                    style={[
                        styles.description,
                        highlighted && styles.highlightedDescription,
                    ]}
                >
                    {description}
                </Text>
            </View>

            {highlighted ? (
                <ActionButton
                    icon="add"
                    onPress={onPress}
                />
            ) : (
                <Ionicons
                    name={icon}
                    size={26}
                    color={colors.green[500]}
                />
            )}
        </Pressable>
    );
}