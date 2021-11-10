import { useAuth } from "@/src/contexts/auth-context";
import { FeedScreenProps } from "@/src/routes/home.routes";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { Row } from "@/src/ui-components/layout/row";
import { Headline } from "@/src/ui-components/text/headline";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWrapper } from "./styles";

interface HeaderProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const HeaderBar: React.FC<HeaderProps> = ({ rightContent, leftContent }) => {
  return (
    <HeaderWrapper>
      <SafeAreaView>
        <Column>
          <Row width="100%" justifyContent="space-between" alignItems="center">
            {leftContent}

            <Headline size="24">Feed</Headline>

            {rightContent}
          </Row>
        </Column>
      </SafeAreaView>
    </HeaderWrapper>
  );
};

export default HeaderBar;
