import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  transparent?: boolean;
}

export const HeaderWrapper = styled(LayoutContainer)<Props>`
  padding: ${rfValuePX(0)} ${rfValuePX(10)} ${rfValuePX(15)} ${rfValuePX(10)};
  width: 100%;
  flex-direction: column;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  z-index: 1;
`;
