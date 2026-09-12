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
 
            justifyContent: "center",
        },
 
        headerTitle: {
            fontSize: 15,
 
            fontWeight: "700",
 
            color:
                colors.black,
        },
 
        headerSpacer: {
            width: 40,
 
            height: 40,
        },

        // ==========================================
        // FILTRO
        // ==========================================

        filterContainer: {
            marginHorizontal: 24,
            marginBottom: 18,
            position: "relative",
            zIndex: 10,
        },

        filterButton: {
            height: 48,
            borderWidth: 1,
            borderColor:
                colors.gray[400],
            borderRadius: 12,
            backgroundColor:
                colors.gray[100],
            paddingHorizontal: 14,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
        },

        filterText: {
            fontSize: 13,
            color: colors.black,
        },

        // ==========================================
        // DROPDOWN
        // ==========================================

        filterDropdown: {
            position: "absolute",
            top: 54,
            left: 0,
            right: 0,
            backgroundColor:
                colors.white,
            borderRadius: 12,
            elevation: 5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            overflow: "hidden",
        },

        filterOption: {
            minHeight: 48,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
        },

        filterOptionText: {
            fontSize: 13,
            color: colors.black,
        },

        // ==========================================
        // LISTA
        // ==========================================

        listContent: {
            paddingHorizontal: 24,
            paddingBottom: 30,
        },

        // ==========================================
        // CARD DA ROTA
        // ==========================================

        routeCard: {
            minHeight: 92,
            backgroundColor:
                colors.white,
            borderRadius: 12,
            marginBottom: 12,
            padding: 8,
            flexDirection: "row",

            elevation: 3,

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity: 0.15,
            shadowRadius: 4,
        },

        // ==========================================
        // MAPA
        // ==========================================

        routeMap: {
            width: 108,
            height: 76,
            borderRadius: 8,
            overflow: "hidden",
            marginRight: 10,
        },

        mapPlaceholder: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
                colors.gray[200],
        },

        // ==========================================
        // INFORMAÇÕES
        // ==========================================

        routeInfo: {
            flex: 1,
            paddingVertical: 5,
            paddingRight: 5,
        },

        routeHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
            marginBottom: 8,
        },

        routeTitle: {
            fontSize: 12,
            fontWeight: "700",
            color: colors.black,
        },

        routeTime: {
            fontSize: 12,
            fontWeight: "700",
            color: colors.black,
        },

        routeDistance: {
            fontSize: 11,
            color: colors.black,
            marginBottom: 8,
        },

        routeDetails: {
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
        },

        detailItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },

        detailText: {
            fontSize: 10,
            color: colors.black,
        },

    });