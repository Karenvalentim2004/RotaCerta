import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },

    content: {
        padding: 20,
        paddingTop: 90,
    },

    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 30,
    },

    header: {
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 16,
        color: colors.gray[600],
        marginBottom: 20,
    },

    section: {
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 12,
    },

    empty: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        color: colors.gray[500],
        fontSize: 15,
    },
});