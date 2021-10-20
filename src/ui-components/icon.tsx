import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import styled from "styled-components/native";
import { ThemeColors } from "../styles/theme";
import { rfValue } from "../utils/responsive-fontsize";

export interface IconProps {
  color?: ThemeColors;
  fontSize?: string;
}

export const FeatherIcon = styled(Feather)<IconProps>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.text};
  font-size: ${({ fontSize }) => fontSize ?? rfValue(24)}px;
`;

export const AntDesignIcon = styled(AntDesign)<IconProps>`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.text};
  font-size: ${({ fontSize }) => fontSize ?? rfValue(24)}px;
`;
