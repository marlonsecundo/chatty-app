import { Entypo, AntDesign } from "@expo/vector-icons";

import styled from "styled-components/native";
import { rfValue } from "../utils/responsive-fontsize";

export interface IconProps {
  fontSize?: string;
}

export const Icon = styled(AntDesign)<IconProps>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ fontSize }) => fontSize ?? rfValue(24)}px;
`;
