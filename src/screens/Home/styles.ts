import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[100],
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 30,
    },
});