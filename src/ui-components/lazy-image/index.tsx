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

const LazyImage: React.FC<ImageProps> = (props) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      setLoaded(true);

      !!props.onLoad && props.onLoad(event);
    },
    []
  );
  return (
    <Shimmer visible={loaded}>
      <StyledImage {...props} onLoad={onLoad}></StyledImage>
    </Shimmer>
  );
};

export default LazyImage;
