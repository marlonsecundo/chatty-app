import styled from "styled-components/native";

interface ContainerProps {
  smargin?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  position?: string;
  sbottom?: string;
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
  }) => `
  margin: ${smargin ?? "0px"};
  justify-content: ${justifyContent ?? "flex-start"};
  align-items: ${alignItems ?? "center"};
  width: ${width ?? "100%"};

  position: ${position ?? "relative"};
  bottom: ${sbottom ?? "auto"};
  height: ${height ?? "auto"};
  `}
`;
