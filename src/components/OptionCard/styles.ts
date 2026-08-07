import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        width: 160,
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 22,
        alignItems: "center",
        position: "relative",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,

        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 3,
    },

    selectedContainer: {
        backgroundColor: colors.green[100],
        borderWidth: 1,
        borderColor: colors.green[300],
    },

    pressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },

    badge: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: colors.green[200],
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    badgeText: {
        color: colors.green[800],
        fontSize: 11,
        fontWeight: "700",
    },

    iconContainer: {
        width: 68,
        height: 68,
        borderRadius: 20,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },

    selectedIconContainer: {
        backgroundColor: colors.green[200],
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
        textAlign: "center",
    },

    description: {
        marginTop: 10,
        textAlign: "center",
        color: colors.gray[600],
        fontSize: 14,
        lineHeight: 20,
    },
});