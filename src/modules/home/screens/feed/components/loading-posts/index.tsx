import { Column } from "@/src/ui-components/layout/column";
import { Headline } from "@/src/ui-components/text/headline";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";

const LoadingPosts: React.FC = () => {
  return (
    <Column
      justifyContent="center"
      alignItems="center"
      spadding={rfValuePX(30)}
      marginBottom={rfValuePX(50)}
    >
      <Headline>🔎</Headline>
      <Headline size="24">loading new posts</Headline>
    </Column>
  );
};

export default LoadingPosts;
