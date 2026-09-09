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

    // =========================
    // CABEÇALHO
    // =========================

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 25,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
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
        lineHeight: 20,
    },

    // =========================
    // CARD DO VEÍCULO
    // =========================

    vehicleCard: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,

        flexDirection: "row",
        alignItems: "flex-start",

        borderWidth: 1,
        borderColor: colors.gray[200],

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },

    vehicleIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 16,

        backgroundColor: colors.green[100],

        justifyContent: "center",
        alignItems: "center",

        marginRight: 14,
    },

    vehicleContent: {
        flex: 1,
        paddingRight: 8,
    },

    vehicleType: {
        fontSize: 17,
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
        gap: 28,
    },

    detailLabel: {
        fontSize: 12,
        color: colors.gray[500],
        marginBottom: 3,
    },

    detailValue: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[800],
    },

    // =========================
    // AÇÕES
    // =========================

    actions: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    editButton: {
        width: 38,
        height: 38,
        borderRadius: 12,

        backgroundColor: colors.green[100],

        justifyContent: "center",
        alignItems: "center",
    },

    deleteButton: {
        width: 38,
        height: 38,
        borderRadius: 12,

        backgroundColor: colors.gray[100],

        justifyContent: "center",
        alignItems: "center",
    },

    deleteText: {
        fontSize: 25,
        lineHeight: 28,
        color: colors.gray[500],
        fontWeight: "400",
    },

    // =========================
    // ADICIONAR VEÍCULO
    // =========================

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

    // =========================
    // FORMULÁRIO
    // =========================

    formContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,

        padding: 20,

        marginTop: 5,
        marginBottom: 20,

        borderWidth: 1,
        borderColor: colors.gray[200],
    },

    formTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: colors.gray[900],

        marginBottom: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray[800],

        marginBottom: 7,
        marginTop: 14,
    },

    input: {
        height: 50,

        borderWidth: 1,
        borderColor: colors.gray[300],

        borderRadius: 13,

        paddingHorizontal: 14,

        fontSize: 14,
        color: colors.gray[900],

        backgroundColor: colors.gray[100],
    },

    // =========================
    // TIPO DO VEÍCULO
    // =========================

    typeContainer: {
        flexDirection: "row",
        gap: 8,
    },

    typeButton: {
        flex: 1,

        height: 46,

        borderRadius: 12,

        borderWidth: 1,
        borderColor: colors.gray[300],

        flexDirection: "row",

        justifyContent: "center",
        alignItems: "center",

        gap: 8,

        backgroundColor: colors.white,
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

    // =========================
    // COMBUSTÍVEL
    // =========================

    fuelButton: {
        flex: 1,

        minHeight: 42,

        borderRadius: 10,

        borderWidth: 1,
        borderColor: colors.gray[300],

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 5,

        backgroundColor: colors.white,
    },

    fuelButtonSelected: {
        backgroundColor: colors.green[600],
        borderColor: colors.green[600],
    },

    fuelText: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.gray[700],
        textAlign: "center",
    },

    fuelTextSelected: {
        color: colors.white,
    },

    // =========================
    // BOTÃO SALVAR
    // =========================

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

    // =========================
    // BOTÃO CANCELAR
    // =========================

    cancelButton: {
        height: 45,

        justifyContent: "center",
        alignItems: "center",

        marginTop: 5,
    },

    cancelText: {
        color: colors.gray[600],

        fontSize: 14,
        fontWeight: "500",
    },

    empty: {
        backgroundColor: colors.white,
        borderRadius: 18,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.gray[200],
    },

    emptyText: {
        fontSize: 14,
        color: colors.gray[500],
        textAlign: "center",
        lineHeight: 20,
    },
});