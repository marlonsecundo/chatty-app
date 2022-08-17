import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components";
import {
  rfPercentage,
  rfValue,
  rfValuePX,
} from "@/src/utils/responsive-fontsize";

export const SubmitButton = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.colors.border};
  justify-content: center;
  align-items: center;
  padding: ${rfValue(15)}px 0px;
`;
