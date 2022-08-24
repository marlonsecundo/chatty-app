import theme from "@/src/styles/theme";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import LazyImage from "@/src/ui-components/lazy-image";
import { Body } from "@/src/ui-components/text/body";
import { addAlphaInRGBStringColor } from "@/src/utils/add-alpha-in-hexcolor";
import {
  rfPercentage,
  rfValue,
  rfValuePX,
} from "@/src/utils/responsive-fontsize";
import { ActivityIndicator } from "react-native";
import {
  BaseButton,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;
`;

export const ProfilePicture = styled(LazyImage)`
  width: ${rfPercentage(15)}px;
  height: ${rfPercentage(15)}px;
  border-radius: 100px;
  border-color: ${theme.colors.text};
  border-width: 1.5px;
`;

export const UsernameText = styled(Body)`
  opacity: 0.7;
`;

export const PostButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ProfileWrapper = styled(LayoutContainer)``;

export const ScrollViewWrapper = styled.ScrollView``;

export const Loading = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.colors.text,
}))`
  position: absolute;
  background-color: ${({ theme }) =>
    addAlphaInRGBStringColor(theme.colors.background, 0.7)};
  height: 100%;
  width: 100%;
  z-index: 1;
`;
