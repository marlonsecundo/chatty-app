import { Image, ImageProps } from "react-native";
import styled from "styled-components/native";

export const StyledImage = styled(Image)<ImageProps>`
  width: auto;
  height: 100%;
  aspect-ratio: 1;
`;
