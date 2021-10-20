import LazyImage from "@/src/ui-components/lazy-image";
import React from "react";
import { AvatarImageWrapper } from "./styles";

const AvatarImage: React.FC = () => {
  return (
    <AvatarImageWrapper>
      <LazyImage
        source={{
          uri: "https://lh3.googleusercontent.com/a-/AOh14GgloPD3GE3827pAuoJgnZ9wYPDCFFM2ffj7UaMD=s96-c",
        }}
      ></LazyImage>
    </AvatarImageWrapper>
  );
};

export default AvatarImage;
