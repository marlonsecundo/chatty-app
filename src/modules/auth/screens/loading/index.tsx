import { Center } from "@/src/ui-components/layout/center";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Headline } from "@/src/ui-components/text/headline";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { Spinner } from "./styles";

const LoadingScreen: React.FC = () => {
  return (
    <Center width="100%" height="100%">
      <Spinner></Spinner>
      <LayoutContainer smargin={`${rfValuePX(20)}`}></LayoutContainer>
      <Headline size="24">loading previous user</Headline>
      <Headline size="36">🧐</Headline>
    </Center>
  );
};

export default LoadingScreen;
