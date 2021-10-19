import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { rfValue } from "../utils/responsive-fontsize";

export const darkTheme: Theme = DarkTheme;
export const lightTheme: Theme = DefaultTheme;

export default {
  colors: darkTheme.colors,
  fonts: {
    headline: {
      default: `${rfValue(36)}px Roboto_500Medium`,
      200: `${rfValue(200)}px Roboto_400Regular`,
      144: `${rfValue(144)}px Roboto_400Regular`,
      96: `${rfValue(96)}px Roboto_400Regular`,
      50: `${rfValue(50)}px Roboto_400Regular`,
      36: `${rfValue(36)}px Roboto_500Medium`,
      24: `${rfValue(24)}px Roboto_400Regular`,
    },
    title: `${rfValue(20)}px Roboto_500Medium`,
    subheader: `${rfValue(18)}px Roboto_400Regular`,
    body: `${rfValue(14)}px Roboto_400Regular`,
    bodyMenu: `${rfValue(14)}px Roboto_500Medium`,
    caption: `${rfValue(12)}px Roboto_400Regular`,
  },
};

// background: "#202128",
// secondary: "#FFFFFF",
// third: "#181920",
// third_light: "#292D3C",
// highlight: "#61A0AF",
