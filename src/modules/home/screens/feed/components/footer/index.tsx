import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import React from "react";
import { FooterWrapper, ActionsWrapper } from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Column>
        <ActionsWrapper>
          <IconButton
            withBackgroundColor={false}
            onPress={() => {}}
            icon={<FeatherIcon name="send"></FeatherIcon>}
          ></IconButton>
        </ActionsWrapper>
      </Column>
    </FooterWrapper>
  );
};

export default Footer;
