import { AntDesignIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { CenterContainer } from "@/src/ui-components/layout/center-container";
import { ColumnContainer } from "@/src/ui-components/layout/column-container";
import { RowContainer } from "@/src/ui-components/layout/row-container";
import { Headline } from "@/src/ui-components/text/headline";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWrapper } from "./styles";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <SafeAreaView>
        <ColumnContainer>
          <RowContainer justifyContent="space-between">
            <IconButton
              withBackgroundColor={false}
              icon={<AntDesignIcon name="arrowleft"></AntDesignIcon>}
            ></IconButton>

            <IconButton
              withBackgroundColor={false}
              icon={<AntDesignIcon name="ellipsis1"></AntDesignIcon>}
            ></IconButton>
          </RowContainer>
        </ColumnContainer>

        <CenterContainer>
          <Headline size="24">Feed</Headline>
        </CenterContainer>
      </SafeAreaView>
    </HeaderWrapper>
  );
};

export default Header;
