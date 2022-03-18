import styled from "styled-components/native";

import { LinearGradient } from "expo-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export const Shimmer = styled(ShimmerPlaceHolder).attrs(() => ({
  LinearGradient: LinearGradient,
}))`
  width: 100%;
  height: 100%;
`;
