import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

import styled from "styled-components/native";
import { rfValue } from "../utils/responsive-fontsize";

export interface IconProps {
  fontSize?: string;
}

export const AntDesignIcon = styled(AntDesign)<IconProps>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ fontSize }) => fontSize ?? rfValue(24)}px;
`;

export const FeatherIcon = styled(Feather)<IconProps>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ fontSize }) => fontSize ?? rfValue(24)}px;
`;
