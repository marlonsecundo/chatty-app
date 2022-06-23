import { Body } from "@/src/ui-components/text/body";
import { rfValue } from "@/src/utils/responsive-fontsize";
import { useNetInfo } from "@react-native-community/netinfo";
import { MotiView } from "moti";
import React from "react";
import styled from "styled-components/native";

// import { Container } from './styles';

const NetStatusBottomBar: React.FC = () => {
  const netInfo = useNetInfo();

  const height = rfValue(30);

  const isInternetReachable = netInfo.isInternetReachable ?? true;

  return (
    <Container animate={{ height: isInternetReachable ? 0 : height }}>
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
