import {
    StyleSheet,
} from "react-native";

import { colors } from "@/theme/colors";

export const styles =
    StyleSheet.create({
        // ==========================================
        // CONTAINER
        // ==========================================

        container: {
            flex: 1,
            backgroundColor:
                colors.gray[100],
        },

        scrollContent: {
            paddingTop: 58,
            paddingBottom: 40,
        },

        // ==========================================
        // HEADER
        // ==========================================

        header: {
            height: 64,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 16,
            backgroundColor:
                colors.gray[100],
        },

        headerButton: {
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent:
                "center",
        },

        headerTitle: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.black,
        },

        // ==========================================
        // MAPA
        // ==========================================

        mapContainer: {
            height: 330,
            marginHorizontal: 20,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor:
                colors.gray[200],
        },

        map: {
            flex: 1,
        },

        mapEmpty: {
            flex: 1,
            alignItems: "center",
            justifyContent:
                "center",
            backgroundColor:
                colors.gray[200],
        },

        mapEmptyText: {
            fontSize: 14,
            color: colors.gray[700],
        },

        // ==========================================
        // MARCADOR - ORIGEM
        // ==========================================

        originMarker: {
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor:
                colors.green[600],
            alignItems: "center",
            justifyContent:
                "center",
            borderWidth: 3,
            borderColor:
                colors.white,
            elevation: 5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
        },

        // ==========================================
        // MARCADOR - ENTREGA
        // ==========================================

        deliveryMarker: {
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor:
                colors.blue[500],
            alignItems: "center",
            justifyContent:
                "center",
            borderWidth: 3,
            borderColor:
                colors.white,
            elevation: 5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
        },

        deliveryMarkerText: {
            color: colors.white,
            fontSize: 14,
            fontWeight: "800",
        },

        // ==========================================
        // MARCADOR - DESTINO FINAL
        // ==========================================

        destinationMarker: {
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor:
                colors.red[500],
            alignItems: "center",
            justifyContent:
                "center",
            borderWidth: 3,
            borderColor:
                colors.white,
            elevation: 5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
        },

        // ==========================================
        // INFORMAÇÕES
        // ==========================================

        infoContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
                "space-between",
            paddingHorizontal: 20,
            paddingTop: 24,
            gap: 16,
        },

        infoCard: {
            width: "47%",
            minHeight: 78,
            padding: 14,
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
            fontSize: 13,
            color: colors.gray[600],
            marginBottom: 8,
        },

        infoValue: {
            fontSize: 19,
            fontWeight: "700",
            color: colors.black,
        },

        // ==========================================
        // ORDEM DAS PARADAS
        // ==========================================

        stopsContainer: {
            marginHorizontal: 20,
            marginTop: 28,
            padding: 18,
            borderRadius: 16,
            backgroundColor:
                colors.white,
            elevation: 3,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 4,
        },

        stopsTitle: {
            fontSize: 18,
            fontWeight: "700",
            color: colors.black,
        },

        stopsSubtitle: {
            marginTop: 5,
            marginBottom: 20,
            fontSize: 13,
            lineHeight: 19,
            color: colors.gray[600],
        },

        timeline: {
            position: "relative",
        },

        stopItem: {
            minHeight: 74,
            flexDirection: "row",
            position: "relative",
        },

        timelineLine: {
            position: "absolute",
            left: 18,
            top: 38,
            bottom: -2,
            width: 2,
            backgroundColor:
                colors.gray[300],
        },

        stopIcon: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent:
                "center",
            zIndex: 2,
            borderWidth: 2,
            borderColor:
                colors.white,
        },

        stopIconOrigin: {
            backgroundColor:
                colors.green[600],
        },

        stopIconDelivery: {
            backgroundColor:
                colors.blue[500],
        },

        stopIconDestination: {
            backgroundColor:
                colors.red[500],
        },

        stopNumber: {
            color: colors.white,
            fontSize: 13,
            fontWeight: "800",
        },

        stopContent: {
            flex: 1,
            marginLeft: 14,
            paddingBottom: 18,
        },

        stopTitle: {
            fontSize: 15,
            fontWeight: "700",
            color: colors.black,
            marginBottom: 4,
        },

        stopAddress: {
            fontSize: 13,
            lineHeight: 18,
            color: colors.gray[700],
        },

        stopRecipient: {
            marginTop: 3,
            fontSize: 12,
            fontWeight: "600",
            color: colors.gray[600],
        },

        // ==========================================
        // BOTÃO INICIAR ROTA
        // ==========================================

        startButton: {
            marginHorizontal: 20,
            marginTop: 24,
            height: 56,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "center",
            gap: 10,
            backgroundColor:
                colors.green[500],
        },

        startButtonText: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.white,
        },
    });