import LazyImage from "@/src/ui-components/lazy-image";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const UserImage = styled(LazyImage)`
  height: ${rfValuePX(40)};
  width: ${rfValuePX(40)};
  border-radius: 30px;
`;
