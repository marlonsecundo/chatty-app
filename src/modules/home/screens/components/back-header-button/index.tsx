import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback } from "react";
import { View } from "react-native";

// import { Container } from './styles';

const BackHeaderButton: React.FC = () => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <IconButton
      onPress={onPress}
      withBackgroundColor={false}
      icon={<FeatherIcon name="arrow-left"></FeatherIcon>}
    ></IconButton>
  );
};

export default BackHeaderButton;
