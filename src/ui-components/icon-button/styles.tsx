import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Row } from "../layout/row";

export interface ButtonProps {
  withBackgroundColor?: boolean;
  borderRadius?: string;
  width?: string;
  height?: string;
}

export const StyledRectButton = styled(RectButton).attrs<ButtonProps>(
  ({ theme, withBackgroundColor }) => ({
    rippleColor: withBackgroundColor
      ? theme.colors.background
      : theme.colors.border,
  })
)<ButtonProps>`
  overflow: hidden;
  background-color: ${({ theme, withBackgroundColor = true }) =>
    withBackgroundColor ? theme.colors.border : "transparent"};

  border-radius: ${({ borderRadius }) => borderRadius ?? "100px"};
  height: ${({ height }) => height ?? "auto"};
  width: ${({ width }) => width ?? "auto"};
`;

export interface ContentWrapperProps {
  size?: "compact" | "normal" | "big";
}

export const ContentWrapper = styled(Row)<ContentWrapperProps>`
  padding: ${({ size }) => {
    switch (size) {
      case "compact":
        return `${rfValuePX(7)} ${rfValuePX(7)}`;
      case "big":
        return `${rfValuePX(20)} ${rfValuePX(32)}`;
      case "normal":
        return `${rfValuePX(8)} ${rfValuePX(15)}`;
    }
  }};
`;
