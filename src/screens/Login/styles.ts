import {
    StyleSheet,
} from "react-native";


export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    content: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        color: "#1B5E20",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666666",
        marginBottom: 40,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 8,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#222222",
        marginBottom: 20,
        backgroundColor: "#F9F9F9",
    },

    button: {
        height: 52,
        borderRadius: 10,
        backgroundColor: "#1B5E20",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});