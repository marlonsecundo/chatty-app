import React, { useContext } from "react";
import { View } from "react-native";

import { CenterContainer } from "@/src/ui-components/layout/center-container";
import AuthContext from "@/src/contexts/auth-context";
import { Headline } from "@/src/ui-components/text/headline";
import IconButton from "@/src/ui-components/icon-button";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { rfValuePX } from "@/src/utils/responsive-fontsize";

const SignInScreen: React.FC = () => {
  const { signUserWithGoogle } = useContext(AuthContext);

  return (
    <CenterContainer>
      <Headline size="50">😉</Headline>
      <LayoutContainer height={rfValuePX(15)} />
      <Headline size="36">CHATTY</Headline>

      <LayoutContainer
        position="absolute"
        sbottom="0px"
        smargin={`${rfValuePX(30)}`}
      >
        <IconButton
          iconName="google"
          text="ENTRAR"
          onPress={signUserWithGoogle}
        ></IconButton>
      </LayoutContainer>
    </CenterContainer>
  );
};

export default SignInScreen;
