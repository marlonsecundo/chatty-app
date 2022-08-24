import theme, { darkTheme, lightTheme } from "@/src/styles/theme";
import { Column } from "@/src/ui-components/layout/column";
import { Body } from "@/src/ui-components/text/body";
import { Headline } from "@/src/ui-components/text/headline";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

interface Props {
  text?: string;
  lightColors?: boolean;
}
const ListEnd: React.FC<Props> = ({ text, lightColors }) => {
  const content = text ? (
    <Body textAlign="center">{text}</Body>
  ) : (
    <>
      <Body>Wow! Seens that you reached the end of the feed!</Body>
      <Body>Pull the screen down to refresh the list!</Body>
    </>
  );
  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: lightColors ? lightTheme.colors : theme.colors,
      }}
    >
      <Column
        smargin={rfValuePX(40)}
        justifyContent="center"
        alignItems="center"
      >
        <Headline>😯</Headline>

        {content}
      </Column>
    </ThemeProvider>
  );
};

export default ListEnd;
