import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "../../theme/colors";

interface ActionButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}

export function ActionButton({
    icon,
    onPress,
}: ActionButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={22}
                color={colors.green[700]}
            />
        </Pressable>
    );
}