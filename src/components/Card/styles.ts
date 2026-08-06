import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 3,
    },

    highlightedContainer: {
        backgroundColor: colors.green[500],
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900]
    },

    highlightedTitle: {
        color: colors.white,
    },

    description: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 18,
        color: colors.gray[600],
        width: "82%"
    },

    highlightedDescription: {
        color: colors.white,
    },

    largeContainer: {
        paddingVertical: 26,
    },

    pressed: {
        opacity: 0.85,
        transform: [
            {
                scale: 0.98
            }
        ]
    },
});