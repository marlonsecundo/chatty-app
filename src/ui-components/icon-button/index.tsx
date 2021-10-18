import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Icon, IconProps } from "../icon";
import { LayoutContainer } from "../layout/layout-container";
import { RowContainer } from "../layout/row-container";
import { Body } from "../text/body";

import { StyledRectButton } from "./styles";

interface IconButtonProps extends RectButtonProps {
  iconName: string;
  text: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  iconName,
  ...props
}) => {
  return (
    <StyledRectButton {...props}>
      <RowContainer
        justifyContent="flex-start"
        smargin={`${rfValuePX(21)} ${rfValuePX(32)}`}
      >
        <Icon name={iconName}></Icon>
        <LayoutContainer width={rfValuePX(10)} />
        <Body>{text}</Body>
      </RowContainer>
    </StyledRectButton>
  );
};

export default IconButton;
