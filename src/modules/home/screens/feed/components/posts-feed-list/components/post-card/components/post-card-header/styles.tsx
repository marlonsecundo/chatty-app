import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import LazyImage from "@/src/ui-components/lazy-image";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const AvatarImage = styled(LazyImage)`
  width: ${rfValuePX(50)};
  height: ${rfValuePX(50)};
  border-radius: ${rfValuePX(50)};
  position: absolute;
`;

export const AvatarButton = styled(RectButton)`
  width: ${rfValuePX(50)};
  height: ${rfValuePX(50)};
  z-index: 1;
`;

export const AvatarButtonWrapper = styled(Column)`
  width: auto;
`;
