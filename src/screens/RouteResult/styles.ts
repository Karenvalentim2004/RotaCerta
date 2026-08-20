import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

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
    },

    mapContainer: {
        height: 300,
        backgroundColor: colors.gray[300],
        borderRadius: 22,
        overflow: "hidden",
    },

    map: {
        width: "100%",
        height: "100%",
    },

    mapLoading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    mapLoadingText: {
        marginTop: 10,
        fontSize: 14,
        color: colors.gray[600],
        textAlign: "center",
    },

    infoContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 18,
    },

    infoCard: {
        width: "48%",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },

    infoValue: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.green[700],
    },

    infoLabel: {
        fontSize: 13,
        color: colors.gray[600],
        marginTop: 4,
    },

    summaryContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 18,
        marginTop: 8,
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 8,
    },

    summaryText: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.gray[600],
    },

    routeContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 18,
        marginTop: 16,
    },

    routeTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 18,
    },

    routeItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 18,
    },

    routeNumber: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.green[100],
        justifyContent: "center",
        alignItems: "center",
    },

    routeNumberText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.green[800],
    },

    routeContent: {
        flex: 1,
        marginLeft: 12,
    },

    routeType: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.green[700],
        marginBottom: 3,
    },

    routeAddress: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.gray[800],
    },

    destinationText: {
        fontSize: 13,
        color: colors.gray[600],
        marginTop: 4,
    },

    startButton: {
        height: 54,
        backgroundColor: colors.green[600],
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    startButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
});