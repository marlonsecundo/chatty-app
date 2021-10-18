import styled from "styled-components/native";

interface HeadlineProps {
  size?: "200" | "144" | "96" | "50" | "36" | "24";
}

export const Headline = styled.Text<HeadlineProps>`
  font: ${({ theme, size }) => theme.fonts.headline[size ?? "default"]};
  color: ${({ theme }) => theme.colors.text};
`;
