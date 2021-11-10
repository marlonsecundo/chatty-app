import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import React from "react";
import { View } from "react-native";

// import { Container } from './styles';

const BackHeaderButton: React.FC = () => {
  return (
    <IconButton
      withBackgroundColor={false}
      icon={<FeatherIcon name="arrow-left"></FeatherIcon>}
    ></IconButton>
  );
};

export default BackHeaderButton;
