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
            paddingTop: 58,
            paddingBottom: 40,
        },

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
            justifyContent: "center",
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
        // INFORMAÇÕES
        // ==========================================

        infoContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
                "space-between",
            paddingHorizontal: 20,
            paddingTop: 32,
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
        // BOTÃO INICIAR ROTA
        // ==========================================

        startButton: {
            marginHorizontal: 20,
            marginTop: 32,
            height: 56,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
                colors.green[500],
        },

        startButtonText: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.white,
        },
    });