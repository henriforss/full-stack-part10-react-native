import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "black",
    textSecondary: "white",
    textThird: "dimgray",
    error: "#d73a4a",
    primary: "#0366d6",
    backgroundAppBar: "navy",
    languageBackground: "royalblue",
    appBackground: "lightgray",
    filterBackground: "darkgray",
    itemBackground: "white",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
