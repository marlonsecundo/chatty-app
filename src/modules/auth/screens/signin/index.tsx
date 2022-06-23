import React, { useContext } from "react";
import { View } from "react-native";

import { Center } from "@/src/ui-components/layout/center";
import AuthContext from "@/src/contexts/auth-context";
import { Headline } from "@/src/ui-components/text/headline";
import IconButton from "@/src/ui-components/icon-button";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { AntDesignIcon } from "@/src/ui-components/icon";

const SignInScreen: React.FC = () => {
  const { signUserWithGoogle } = useContext(AuthContext);

  return (
    <Center width="100%" height="100%">
      <Headline size="50">😉</Headline>

      <LayoutContainer height={rfValuePX(15)} />
      <Headline size="36">CHATTY</Headline>

      <LayoutContainer
        position="absolute"
        sbottom="0px"
        smargin={`${rfValuePX(30)}`}
      >
        <IconButton
          icon={<AntDesignIcon name="google"></AntDesignIcon>}
          text="ENTRAR"
          size="big"
          onPress={signUserWithGoogle}
        ></IconButton>
      </LayoutContainer>
    </Center>
  );
};

export default SignInScreen;
