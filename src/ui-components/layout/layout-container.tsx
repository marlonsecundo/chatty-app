import styled from "styled-components/native";

interface ContainerProps {
  smargin?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  position?: string;
  sbottom?: string;
  sflex?: number;
  spadding?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  paddingBottom?: string;
  paddingTop?: string;

  backgroundColor?: string;
}

export const LayoutContainer = styled.View<ContainerProps>`
  ${({
    smargin,
    justifyContent,
    alignItems,
    width,
    position,
    sbottom,
    height,
    sflex,
    spadding,
    backgroundColor,
  }) => `
  margin: ${smargin ?? "0px"};
  justify-content: ${justifyContent ?? "flex-start"};
  align-items: ${alignItems ?? "stretch"};
  position: ${position ?? "relative"};
  bottom: ${sbottom ?? "auto"};
  height: ${height ?? "auto"};
  width: ${width ?? "auto"};
  flex: ${sflex ?? "none"};
  padding: ${spadding ?? "0px"};
  background-color: ${backgroundColor ?? "transparent"};
  
  `}

  ${({ paddingBottom }) =>
    paddingBottom ? `padding-bottom: ${paddingBottom}` : ""};

  ${({ paddingTop }) => (paddingTop ? `padding-top: ${paddingTop}` : "")};

  ${({ marginTop }) => (marginTop ? ` margin-top: ${marginTop}` : "")};
  ${({ marginLeft }) => (marginLeft ? ` margin-left: ${marginLeft}` : "")};
  ${({ marginRight }) => (marginRight ? ` margin-right: ${marginRight}` : "")};
  ${({ marginBottom }) =>
    marginBottom ? ` margin-bottom: ${marginBottom}` : ""};
`;
