import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export interface ButtonProps {
  withBackgroundColor?: boolean;
}

export const StyledRectButton = styled(RectButton)<ButtonProps>`
  background-color: ${({ theme, withBackgroundColor }) =>
    withBackgroundColor ? theme.colors.border : "transparent"};

  border-radius: 100px;
`;
