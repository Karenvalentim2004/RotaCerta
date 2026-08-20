import { StyleSheet } from "react-native";

import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },

    /* CABEÇALHO VERDE */

    profileHeader: {
        height: 235,
        backgroundColor: colors.green[600],
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    backButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: 15,
    },

    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 33,
        backgroundColor: colors.gray[600],
        justifyContent: "center",
        alignItems: "center",
    },

    userInfo: {
        marginLeft: 12,
        flex: 1,
    },

    userName: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.white,
    },

    userEmail: {
        fontSize: 15,
        color: colors.white,
        marginTop: 2,
    },

    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 7,
        width: 110,
        height: 30,
        marginTop: 10,
        gap: 5,
    },

    editButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "500",
    },

    /* CARD DE OPÇÕES */

    optionsContainer: {
        backgroundColor: colors.white,
        borderRadius: 14,
        marginHorizontal: 28,
        marginTop: 100,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 3,
        height: 245,
    },

    option: {
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[400],
        paddingHorizontal: 14,
    },

    lastOption: {
        borderBottomWidth: 0,
    },

    optionIcon: {
        width: 50,
        height: 50,
        borderRadius: 33,
        backgroundColor: colors.gray[200],
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    optionText: {
        flex: 1,
        fontSize: 17,
        color: colors.gray[900],
    },
});