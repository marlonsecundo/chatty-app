import { Body } from "@/src/ui-components/text/body";
import { rfValue } from "@/src/utils/responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { MotiView } from "moti";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";
import styled from "styled-components/native";

// import { Container } from './styles';

const NetStatusBottomBar: React.FC = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    console.log(netInfo);
  }, [netInfo]);

  return (
    <Container
      animate={{ height: netInfo.isInternetReachable ? 0 : rfValue(30) }}
    >
      <Body>No internet connection</Body>
    </Container>
  );
};

const Container = styled(MotiView)`
  background: red;
  justify-content: center;
  align-items: center;
`;

export default NetStatusBottomBar;
