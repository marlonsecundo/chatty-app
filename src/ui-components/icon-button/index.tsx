import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React, { ReactNode } from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { AntDesignIcon, FeatherIcon } from "../icon";
import { LayoutContainer } from "../layout/layout-container";
import { RowContainer } from "../layout/row-container";
import { Body } from "../text/body";

import { StyledRectButton, ButtonProps } from "./styles";

interface IconButtonProps extends RectButtonProps, ButtonProps {
  icon: ReactNode;
  text?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  icon,
  withBackgroundColor,
  ...props
}) => {
  const margin = !!text
    ? `${rfValuePX(20)} ${rfValuePX(32)}`
    : `${rfValuePX(10)} ${rfValuePX(10)}`;

  return (
    <StyledRectButton {...props} withBackgroundColor={withBackgroundColor}>
      <RowContainer justifyContent="flex-start" smargin={margin}>
        {icon}
        {text && (
          <>
            <LayoutContainer width={rfValuePX(10)} />
            <Body>{text}</Body>
          </>
        )}
      </RowContainer>
    </StyledRectButton>
  );
};

export default IconButton;
