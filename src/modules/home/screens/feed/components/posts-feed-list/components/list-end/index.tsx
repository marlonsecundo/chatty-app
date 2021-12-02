import { Column } from "@/src/ui-components/layout/column";
import { Body } from "@/src/ui-components/text/body";
import { Headline } from "@/src/ui-components/text/headline";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";

const ListEnd: React.FC = () => {
  return (
    <Column smargin={rfValuePX(40)} justifyContent="center" alignItems="center">
      <Headline>😯</Headline>
      <Body>Wow! Seens that you reach the end of the feed!</Body>
      <Body>Pull the screen down to refresh the list!</Body>
    </Column>
  );
};

export default ListEnd;
