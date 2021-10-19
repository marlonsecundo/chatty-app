import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { ColumnContainer } from "@/src/ui-components/layout/column-container";
import { RowContainer } from "@/src/ui-components/layout/row-container";
import React from "react";
import { FooterWrapper, ActionsWrapper, StyledBorder } from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <ColumnContainer>
        <StyledBorder></StyledBorder>
        <ActionsWrapper>
          <IconButton
            onPress={() => {}}
            icon={<FeatherIcon name="send"></FeatherIcon>}
          ></IconButton>
        </ActionsWrapper>
      </ColumnContainer>
    </FooterWrapper>
  );
};

export default Footer;
