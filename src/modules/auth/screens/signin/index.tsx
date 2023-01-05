import React, { useCallback, useContext, useEffect } from "react";
import { View } from "react-native";

import { Center } from "@/src/ui-components/layout/center";
import AuthContext, { useAuth } from "@/src/contexts/auth-context";
import { Headline } from "@/src/ui-components/text/headline";
import IconButton from "@/src/ui-components/icon-button";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { AntDesignIcon } from "@/src/ui-components/icon";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import Toast from "react-native-root-toast";

const SignInScreen: React.FC = () => {
  const { signUserWithGoogle, authenticateUser } = useAuth();

  const { token } = useAuth();

  const handleSigninButton = useCallback(async () => {
    try {
      await signUserWithGoogle();
    } catch (error) {
      const exception = getExceptionFromError(error);
      Toast.show(exception.message);
    }
  }, []);

  async function authUser() {
    try {
      if (token === null || token === "" || token === undefined) return;

      await authenticateUser(token);
    } catch (error) {
      const exception = getExceptionFromError(error);
      Toast.show(exception.message);
    }
  }

  useEffect(() => {
    authUser();
  }, [token]);

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
          onPress={handleSigninButton}
        ></IconButton>
      </LayoutContainer>
    </Center>
  );
};

export default SignInScreen;
