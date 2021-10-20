import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Row } from "../layout/row";

export interface ButtonProps {
  withBackgroundColor?: boolean;
}

export const StyledRectButton = styled(RectButton).attrs<ButtonProps>(
  ({ theme }) => ({
    rippleColor: theme.colors.background,
  })
)<ButtonProps>`
  overflow: hidden;
  background-color: ${({ theme, withBackgroundColor = true }) =>
    withBackgroundColor ? theme.colors.border : "transparent"};

  border-radius: 100px;
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
