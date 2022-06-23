import theme, { darkTheme, lightTheme } from "@/src/styles/theme";
import { Column } from "@/src/ui-components/layout/column";
import { Spinner } from "@/src/ui-components/spinner";
import { Headline } from "@/src/ui-components/text/headline";
import { Subheader } from "@/src/ui-components/text/subheader";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { ThemeProvider } from "styled-components";

interface Props {
  text?: string;
  lightColors?: boolean;
}

const LoadingPosts: React.FC<Props> = ({
  text = "loading new posts",
  lightColors,
}) => {
  return (
    <Column
      justifyContent="center"
      alignItems="center"
      spadding={rfValuePX(30)}
      marginBottom={rfValuePX(50)}
    >
      <ThemeProvider
        theme={{
          ...theme,
          colors: lightColors ? lightTheme.colors : darkTheme.colors,
        }}
      >
        <Spinner></Spinner>
        <Subheader>{text}</Subheader>
      </ThemeProvider>
    </Column>
  );
};

export default LoadingPosts;
