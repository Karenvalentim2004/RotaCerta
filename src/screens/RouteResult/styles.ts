import {
    StyleSheet,
} from "react-native";

import {
    colors,
} from "@/theme/colors";

export const styles =
    StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor:
                colors.gray[100],
            paddingHorizontal: 10,
        },

        // CABEÇALHO

        header: {
            height: 62,
            backgroundColor:
                colors.gray[100],
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-between",
        },

        headerButton: {
            width: 42,
            height: 42,
            alignItems: "center",
            justifyContent: "center",
        },

        headerTitle: {
            fontSize: 13,
            fontWeight: "700",
            color: colors.black,
        },

        // MAPA

        mapContainer: {
            height: 250,
            backgroundColor:
                "#DCE5D7",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
        },

        mapText: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.gray[100],
        },

        mapSubtext: {
            fontSize: 13,
            marginTop: 6,
            color: colors.gray[100],
        },

        // INFORMAÇÕES

        infoContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:
                "space-between",
            paddingHorizontal: 10,
            marginTop: 28,
        },

        infoCard: {
            width: "48%",
            height: 62,
            backgroundColor:
                colors.white,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 10,

            marginBottom: 18,

            elevation: 3,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3,
        },

        infoLabel: {
            fontSize: 11,
            color: colors.black,
            marginBottom: 5,
        },

        infoValue: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.black,
        },

        // BOTÃO

        startButton: {
            height: 48,
            marginHorizontal: 10,
            marginTop: 10,

            backgroundColor:
                colors.green[600],

            borderRadius: 12,

            alignItems: "center",
            justifyContent: "center",
        },

        startButtonText: {
            fontSize: 14,
            fontWeight: "700",
            color: colors.white,
        },

    });