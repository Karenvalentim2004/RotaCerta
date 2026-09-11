import {
    StyleSheet,
} from "react-native";

import { colors } from "@/theme/colors";

export const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                colors.gray[100],
            paddingTop: 55,
            paddingBottom: 40,
        },

        header: {
            height: 64,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 16,

        },

        headerButton: {
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent:
                "center",
        },

        headerTitle: {
            fontSize: 15,
            fontWeight: "700",
            color: colors.black,
        },

        // MAPA

        mapContainer: {
            height: 220,
            marginHorizontal: 16,
            borderRadius: 12,
            overflow: "hidden",
        },

        map: {
            flex: 1,
        },

        mapEmpty: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
                colors.gray[200],
        },

        mapEmptyText: {
            fontSize: 14,
            color: colors.gray[700],
        },

        // ==========================================
        // MARCADOR DE ENTREGA
        // ==========================================

        deliveryMarker: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor:
                colors.green[500],
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 3,
            borderColor:
                colors.white,
        },

        deliveryMarkerText: {
            color: colors.white,
            fontSize: 13,
            fontWeight: "700",
        },

        // ==========================================
        // PRÓXIMA PARADA
        // ==========================================

        nextStopCard: {
            marginHorizontal: 24,
            marginTop: 18,
            paddingHorizontal: 14,
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor:
                colors.white,
            flexDirection: "row",
            justifyContent:
                "space-between",
            alignItems: "center",

            elevation: 3,

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity: 0.15,
            shadowRadius: 4,
        },

        nextStopLabel: {
            fontSize: 12,
            color: colors.gray[600],
            marginBottom: 6,
        },

        nextStopAddress: {
            fontSize: 13,
            color: colors.black,
            fontWeight: "500",
            maxWidth: 220,
        },

        nextStopRight: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },

        nextStopDistance: {
            fontSize: 13,
            fontWeight: "700",
            color: colors.green[500],
        },

        // ==========================================
        // PROGRESSO
        // ==========================================

        progressContainer: {
            marginHorizontal: 24,
            marginTop: 18,
        },

        progressHeader: {
            flexDirection: "row",
            justifyContent:
                "space-between",
            marginBottom: 8,
        },

        progressTitle: {
            fontSize: 13,
            color: colors.gray[600],
        },

        progressCount: {
            fontSize: 13,
            fontWeight: "700",
            color: colors.green[500],
        },

        progressBar: {
            height: 7,
            borderRadius: 4,
            backgroundColor:
                colors.gray[300],
            overflow: "hidden",
        },

        progressFill: {
            height: "100%",
            borderRadius: 4,
            backgroundColor:
                colors.green[500],
        },

        // ==========================================
        // INFORMAÇÕES
        // ==========================================

        infoContainer: {
            flexDirection: "row",
            gap: 12,
            marginHorizontal: 24,
            marginTop: 18,
        },

        infoCard: {
            flex: 1,
            minHeight: 68,
            padding: 13,
            borderRadius: 12,
            backgroundColor:
                colors.white,

            elevation: 3,

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity: 0.15,
            shadowRadius: 4,
        },

        infoLabel: {
            fontSize: 12,
            color: colors.gray[600],
            marginBottom: 7,
        },

        infoValue: {
            fontSize: 18,
            fontWeight: "700",
            color: colors.black,
        },

        // ==========================================
        // ENCERRAR ROTA
        // ==========================================

        endButton: {
            marginHorizontal: 24,
            marginTop: 20,
            height: 48,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor:
                colors.red[500],
            backgroundColor:
                colors.white,
        },

        endButtonText: {
            fontSize: 15,
            fontWeight: "700",
            color: colors.red[500],
        },
    });