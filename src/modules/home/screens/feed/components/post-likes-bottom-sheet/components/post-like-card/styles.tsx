import LazyImage from "@/src/ui-components/lazy-image";
import { Body } from "@/src/ui-components/text/body";
import { Caption } from "@/src/ui-components/text/caption";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const UserImage = styled(LazyImage)`
  height: ${rfValuePX(40)};
  width: ${rfValuePX(40)};
  border-radius: 30px;
`;

export const DarkBody = styled(Body)`
  color: black;
`;

export const DarkCaption = styled(Caption)`
  color: black;
`;
