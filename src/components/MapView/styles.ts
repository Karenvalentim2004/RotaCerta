import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 220,
        borderRadius: 20,
        overflow: "hidden",
        marginTop: 20,
    },

    map: {
        width: "100%",
        height: "100%",
    },

    loadingContainer: {
        width: "100%",
        height: 220,
        borderRadius: 20,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    loadingText: {
        marginTop: 8,
        fontSize: 13,
        color: colors.gray[600],
    },
});