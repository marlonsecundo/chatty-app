import styled from "styled-components/native";
import { rfValuePX } from "../utils/responsive-fontsize";

interface Props {
  height?: string;
  width?: string;
}

export const Line = styled.View<Props>`
  height: ${({ height }) => height ?? rfValuePX(1)};
  width: ${({ width }) => width ?? "100%"};
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
`;
