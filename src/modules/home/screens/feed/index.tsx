import { CenterContainer } from "@/src/ui-components/layout/center-container";
import { ColumnContainer } from "@/src/ui-components/layout/column-container";
import { Headline } from "@/src/ui-components/text/headline";
import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { Container } from './styles';

const FeedScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <ColumnContainer alignItems="flex-start">
        <Headline>FEED</Headline>
      </ColumnContainer>
    </SafeAreaView>
  );
};

export default FeedScreen;
