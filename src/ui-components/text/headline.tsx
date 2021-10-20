import styled from "styled-components/native";
import { StyledText } from "./styled-text";

interface HeadlineProps {
  size?: "200" | "144" | "96" | "50" | "36" | "24";
}

export const Headline = styled(StyledText)<HeadlineProps>`
  font: ${({ theme, size }) => theme.fonts.headline[size ?? "default"]};
`;
