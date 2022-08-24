import LazyImage from "@/src/ui-components/lazy-image";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const ProfileImage = styled(LazyImage)`
  height: ${rfValuePX(35)};
  border-radius: 30px;
  overflow: hidden;
  max-width: ${rfValuePX(35)};
`;

export const StyledButton = styled(RectButton)`
  height: ${rfValuePX(45)};
  width: ${rfValuePX(45)};

  justify-content: center;
  align-items: center;
`;
