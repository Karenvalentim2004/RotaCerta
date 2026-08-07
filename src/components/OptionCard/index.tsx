import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { styles } from "./styles";

interface OptionCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  recommended?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

export function OptionCard({
  title,
  description,
  icon,
  recommended = false,
  selected = false,
  onPress,
}: OptionCardProps) {
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selectedContainer,
        pressed && styles.pressed,
      ]}
    >
      {recommended && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Recomendado</Text>
        </View>
      )}

      <View
        style={[
          styles.iconContainer,
          selected && styles.selectedIconContainer,
        ]}
      >
        <Ionicons
          name={icon}
          size={30}
          color={colors.green[700]}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>
    </Pressable>
  );
}