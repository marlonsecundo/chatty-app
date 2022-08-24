import styled from "styled-components/native";
import { ThemeColors } from "@/src/styles/theme";

interface TextProps {
  color?: ThemeColors;
  opacity?: number;
  textAlign?: string;
  fontFamily?: "Roboto_500Medium" | "Roboto_400Regular" | "Roboto_700Bold";
  lineHeight?: number;
}

export const StyledText = styled.Text<TextProps>`
  ${({ color, opacity, textAlign, theme }) => `
  color: ${color ? theme.colors[color] : theme.colors.text};
  opacity: ${opacity ?? 1};
  text-align: ${textAlign ?? "auto"};  
`}

  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}px` : "")};
`;
