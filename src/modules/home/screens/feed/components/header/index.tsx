import { AntDesignIcon, FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Center } from "@/src/ui-components/layout/center";
import { Column } from "@/src/ui-components/layout/column";
import { Row } from "@/src/ui-components/layout/row";
import { Headline } from "@/src/ui-components/text/headline";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWrapper } from "./styles";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <SafeAreaView>
        <Column>
          <Row width="100%" justifyContent="space-between">
            <IconButton
              withBackgroundColor={false}
              icon={<FeatherIcon name="arrow-left"></FeatherIcon>}
            ></IconButton>

            <Headline size="24">Feed</Headline>

            <IconButton
              withBackgroundColor={false}
              icon={<FeatherIcon name="more-horizontal"></FeatherIcon>}
            ></IconButton>
          </Row>
        </Column>
      </SafeAreaView>
    </HeaderWrapper>
  );
};

export default Header;
