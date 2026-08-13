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
        paddingBottom: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.gray[900],
    },

    subtitle: {
        fontSize: 15,
        color: colors.gray[600],
        marginTop: 6,
        marginBottom: 20,
        lineHeight: 21,
    },

    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 25,
        gap: 12,
    },

    section: {
        marginTop: 5,
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 5,
    },

    sectionDescription: {
        fontSize: 14,
        color: colors.gray[600],
        marginBottom: 12,
        lineHeight: 19,
    },

    input: {
        height: 52,
        backgroundColor: colors.white,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.gray[300],
        paddingHorizontal: 15,
        fontSize: 14,
        color: colors.gray[900],
    },

    manualContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 18,
        marginBottom: 20,
    },

    manualHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    manualTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
    },

    manualClose: {
        fontSize: 28,
        color: colors.gray[600],
        lineHeight: 30,
    },

    fieldLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[800],
        marginBottom: 7,
    },

    addManualButton: {
        backgroundColor: colors.green[600],
        height: 50,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },

    addManualText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
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
        textAlign: "center",
    },

    destinationCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 16,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    destinationContent: {
        flex: 1,
        paddingRight: 10,
    },

    destinationTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 5,
    },

    destinationText: {
        fontSize: 13,
        color: colors.gray[600],
        marginTop: 2,
    },

    deleteButton: {
        fontSize: 18,
        padding: 5,
    },

    addDestination: {
        textAlign: "center",
        color: colors.green[700],
        fontSize: 15,
        fontWeight: "700",
        marginTop: 8,
        paddingVertical: 10,
    },

    vehicleCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.gray[200],
    },

    vehicleIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: colors.green[100],
        justifyContent: "center",
        alignItems: "center",
    },

    vehicleIcon: {
        fontSize: 24,
    },

    vehicleInfo: {
        flex: 1,
        marginLeft: 12,
    },

    vehicleTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.gray[900],
    },

    vehicleText: {
        fontSize: 13,
        color: colors.gray[600],
        marginTop: 3,
    },

    vehicleArrow: {
        fontSize: 28,
        color: colors.gray[500],
        marginLeft: 10,
    },

    optimizeButton: {
        height: 54,
        borderRadius: 15,
        backgroundColor: colors.green[600],
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 20,
    },

    optimizeButtonDisabled: {
        opacity: 0.6,
    },

    optimizeText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    
});