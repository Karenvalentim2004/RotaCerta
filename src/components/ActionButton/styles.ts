import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    pressed: {
        opacity: 0.7,
    },
});