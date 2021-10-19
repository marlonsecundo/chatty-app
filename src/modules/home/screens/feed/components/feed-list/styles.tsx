import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const FeedWrapper = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  transform: translateY(-10px);
  padding-top: ${rfValuePX(20)};
`;
