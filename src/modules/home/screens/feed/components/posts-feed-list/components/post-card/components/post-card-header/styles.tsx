import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const AvatarImageWrapper = styled.View`
  width: ${rfValuePX(50)};
  height: ${rfValuePX(50)};
  border-radius: ${rfValuePX(50)};
  overflow: hidden;
`;
