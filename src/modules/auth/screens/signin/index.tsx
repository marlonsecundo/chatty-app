import React, { useContext } from "react";
import { View, Text } from "react-native";

import { CenterContainer } from "@/src/ui-components/layout/center-container";
import { RectButton } from "react-native-gesture-handler";
import AuthContext from "@/src/contexts/auth-context";

const SignInScreen: React.FC = () => {
  const { signUserWithGoogle } = useContext(AuthContext);

  return (
    <View>
      <CenterContainer>
        <Text>Signin Page</Text>
        <RectButton onPress={signUserWithGoogle}>
          <Text>Entrar</Text>
        </RectButton>
      </CenterContainer>
    </View>
  );
};

export default SignInScreen;
