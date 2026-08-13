import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },

    map: {
        width: "100%",
        height: "100%",
    },

    loadingContainer: {
        flex: 1,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: colors.gray[600],
    },

    errorContainer: {
        flex: 1,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    errorText: {
        textAlign: "center",
        fontSize: 16,
        color: colors.gray[700],
    },
});