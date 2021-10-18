import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const StyledRectButton = styled(RectButton)`
  height: ${rfValuePX(70)};
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 100px;
`;
