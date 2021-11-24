import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import LazyImage from "@/src/ui-components/lazy-image";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface Props {
  transparent?: boolean;
}

export const HeaderWrapper = styled(LayoutContainer)<Props>`
  padding: ${rfValuePX(0)} ${rfValuePX(10)} ${rfValuePX(15)} ${rfValuePX(10)};
  background-color: ${({ theme, transparent }) =>
    transparent ? "transparent" : theme.colors.border};
  width: 100%;
  flex-direction: column;
  border-radius: 8px;
  z-index: 1;
`;
