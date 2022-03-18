import styled from "styled-components/native";
import { StyledText } from "./styled-text";

export const Caption = styled(StyledText)`
  font: ${({ theme }) => theme.fonts.caption};
`;
