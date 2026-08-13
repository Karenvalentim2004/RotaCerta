import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },

    cameraContainer: {
        flex: 1,
    },

    camera: {
        flex: 1,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between",
    },

    closeButton: {
        marginTop: 20,
        marginLeft: 20,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    closeText: {
        color: colors.white,
        fontSize: 30,
        fontWeight: "300",
        lineHeight: 32,
    },

    instructionContainer: {
        alignItems: "center",
        paddingHorizontal: 30,
    },

    instructionTitle: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 8,
    },

    instructionText: {
        color: colors.white,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
    },

    captureContainer: {
        alignItems: "center",
        paddingBottom: 35,
    },

    captureButton: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.green[500],
        borderWidth: 4,
        borderColor: colors.white,
    },

    permissionContainer: {
        flex: 1,
        backgroundColor: colors.gray[100],
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    permissionTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.gray[900],
        marginBottom: 12,
        textAlign: "center",
    },

    permissionText: {
        fontSize: 15,
        color: colors.gray[600],
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 25,
    },

    permissionButton: {
        width: "100%",
        height: 52,
        borderRadius: 14,
        backgroundColor: colors.green[600],
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },

    cancelButton: {
        marginTop: 15,
        padding: 10,
    },

    cancelText: {
        color: colors.gray[600],
        fontSize: 14,
    },

    previewContainer: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "center",
    },

    previewImage: {
        width: "100%",
        height: "75%",
    },

    previewActions: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 12,
    },

    retakeButton: {
        height: 52,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    retakeText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },

    useButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: colors.green[500],
        justifyContent: "center",
        alignItems: "center",
    },

    useText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
});