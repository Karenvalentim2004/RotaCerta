import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 17,
    color: colors.gray[600],
    marginBottom: 4,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.gray[900],
    width: 240,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },
});