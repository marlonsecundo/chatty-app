import styled from "styled-components/native";
import { StyledText } from "./styled-text";

export const Body = styled(StyledText)`
  font: ${({ theme }) => theme.fonts.body};
  ${({ fontFamily }) => (fontFamily ? `font-family: ${fontFamily}` : "")};
`;

export const BodyMenu = styled(StyledText)`
  font: ${({ theme }) => theme.fonts.bodyMenu};
`;
