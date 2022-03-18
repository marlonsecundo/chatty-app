import React, { ReactNode, useCallback, useState } from "react";
import {
  Image,
  ImageLoadEventData,
  ImageProps,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { Shimmer } from "../shimmer";

import { StyledImage } from "./styles";

interface LazyImageProps {
  imageUrl: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ imageUrl, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      setLoaded(true);
    },
    []
  );
  return (
    <Shimmer {...props} visible={loaded}>
      <StyledImage source={{ uri: imageUrl }} onLoad={onLoad}></StyledImage>
    </Shimmer>
  );
};

export default LazyImage;
