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
            paddingTop: 55,
        },

        // ==========================================
        // CABEÇALHO
        // ==========================================

        header: {
            height: 64,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 16,
        },

        backButton: {
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

        headerSpacer: {
            width: 40,
            height: 40,
        },

        // ==========================================
        // SCROLL
        // ==========================================

        scroll: {
            flex: 1,
        },

        scrollContent: {
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 40,
        },

        // ==========================================
        // TIMELINE
        // ==========================================

        timelineContainer: {
            position: "relative",
        },

        timelineItem: {
            minHeight: 82,
            flexDirection: "row",
            position: "relative",
        },

        // ==========================================
        // LINHA
        // ==========================================

        timelineLine: {
            position: "absolute",
            left: 15,
            top: 31,
            bottom: -1,
            width: 2,
            backgroundColor:
                colors.green[300],
        },

        // ==========================================
        // ÍCONE
        // ==========================================

        stopIcon: {
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent:
                "center",
            zIndex: 2,
        },

        originIcon: {
            backgroundColor:
                colors.green[500],
        },

        deliveryIcon: {
            backgroundColor:
                colors.green[400],
        },

        destinationIcon: {
            backgroundColor:
                colors.red[500],
        },

        stopNumber: {
            color: colors.white,
            fontSize: 13,
            fontWeight: "700",
        },

        // ==========================================
        // CONTEÚDO DA PARADA
        // ==========================================

        stopContent: {
            flex: 1,
            marginLeft: 20,
            paddingBottom: 22,
            borderBottomWidth: 1,
            borderBottomColor:
                colors.gray[300],
        },

        stopTitle: {
            fontSize: 12,
            fontWeight: "500",
            color: colors.black,
            marginBottom: 7,
        },

        stopAddress: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.black,
            maxWidth: 230,
        },

        stopRecipient: {
            fontSize: 11,
            color: colors.gray[600],
            marginTop: 3,
        },

        stopMetrics: {
            position: "absolute",
            right: 0,
            bottom: 22,
            fontSize: 9,
            color: colors.gray[700],
        },

        // ==========================================
        // RESUMO
        // ==========================================

        summaryContainer: {
            flexDirection: "row",
            gap: 14,
            marginTop: 34,
        },

        summaryCard: {
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

        summaryLabel: {
            fontSize: 11,
            color: colors.gray[600],
            marginBottom: 8,
        },

        summaryValue: {
            fontSize: 17,
            fontWeight: "700",
            color: colors.black,
        },
    });