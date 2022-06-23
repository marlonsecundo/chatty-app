import { ThemeColors } from "@/src/styles/theme";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React, { ReactNode } from "react";
import {
  LongPressGestureHandler,
  RectButton,
  RectButtonProps,
  State,
} from "react-native-gesture-handler";
import { FeatherIcon } from "../icon";
import { LayoutContainer } from "../layout/layout-container";
import { Row } from "../layout/row";
import { Body } from "../text/body";

import {
  StyledRectButton,
  ButtonProps,
  ContentWrapperProps,
  ContentWrapper,
} from "./styles";

interface IconButtonProps
  extends RectButtonProps,
    ButtonProps,
    ContentWrapperProps {
  icon: ReactNode;
  text?: string;
  textColor?: ThemeColors;
  onLongPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  icon,
  withBackgroundColor,
  size = "compact",
  textColor,
  onLongPress = () => {},
  ...props
}) => {
  const textContent = !!text ? (
    <>
      <LayoutContainer width={rfValuePX(10)} />
      <Body color={textColor}>{text}</Body>
    </>
  ) : null;

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          onLongPress();
        }
      }}
      minDurationMs={800}
    >
      <StyledRectButton {...props} withBackgroundColor={withBackgroundColor}>
        <ContentWrapper size={size} justifyContent="center">
          {icon}
          {textContent}
        </ContentWrapper>
      </StyledRectButton>
    </LongPressGestureHandler>
  );
};

export default IconButton;
