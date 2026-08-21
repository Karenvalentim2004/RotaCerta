import { StyleSheet } from "react-native";

import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },

    content: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 40,
    },

    // CABEÇALHO

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        marginTop: 35,
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },

    back: {
        fontSize: 42,
        color: colors.gray[900],
        lineHeight: 42,
    },

    headerText: {
        flex: 1,
    },

    title: {
        fontSize: 23,
        fontWeight: "700",
        color: colors.gray[900],
    },

    subtitle: {
        fontSize: 14,
        color: colors.gray[600],
        marginTop: 4,
    },

    // CARD DO VEÍCULO

    vehicleCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "flex-start",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    vehicleIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: colors.green[100],
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    vehicleContent: {
        flex: 1,
    },

    vehicleType: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
    },

    vehicleModel: {
        fontSize: 14,
        color: colors.gray[700],
        marginTop: 4,
    },

    vehicleDetails: {
        flexDirection: "row",
        marginTop: 14,
        gap: 30,
    },

    detailLabel: {
        fontSize: 12,
        color: colors.gray[500],
        marginBottom: 2,
    },

    detailValue: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[800],
    },

    deleteButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    deleteText: {
        fontSize: 24,
        color: colors.gray[500],
    },

    actions: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    editButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.green[100],
        justifyContent: "center",
        alignItems: "center",
    },

    // ADICIONAR

    addButton: {
        height: 52,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: colors.green[600],
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    addButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.green[700],
    },

    // FORMULÁRIO

    formContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        marginTop: 5,
        marginBottom: 20,
    },

    formTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[800],
        marginBottom: 7,
        marginTop: 12,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: colors.gray[300],
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: colors.gray[900],
        backgroundColor: colors.gray[100],
    },

    // TIPO

    typeContainer: {
        flexDirection: "row",
        gap: 8,
    },

    typeButton: {
        flex: 1,
        height: 45,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray[300],
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    typeButtonSelected: {
        backgroundColor: colors.green[600],
        borderColor: colors.green[600],
    },

    typeText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[700],
    },

    typeTextSelected: {
        color: colors.white,
    },

    // COMBUSTÍVEL

    fuelButton: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray[300],
        justifyContent: "center",
        alignItems: "center",
    },

    fuelButtonSelected: {
        backgroundColor: colors.green[600],
        borderColor: colors.green[600],
    },

    fuelText: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.gray[700],
    },

    fuelTextSelected: {
        color: colors.white,
    },

    // BOTÕES

    saveButton: {
        height: 50,
        backgroundColor: colors.green[600],
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    saveButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },

    cancelButton: {
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    cancelText: {
        color: colors.gray[600],
        fontSize: 14,
    },
});