import { Column } from "@/src/ui-components/layout/column";
import { Spinner } from "@/src/ui-components/spinner";
import { Headline } from "@/src/ui-components/text/headline";
import { Subheader } from "@/src/ui-components/text/subheader";
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
      <Spinner></Spinner>
      <Subheader>loading new posts</Subheader>
    </Column>
  );
};

export default LoadingPosts;
