import { Row } from "@/src/ui-components/layout/row";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const FooterWrapper = styled.View`
  position: absolute;
  width: 100%;
  z-index: 1;
  bottom: 0px;
`;

export const ActionsWrapper = styled(Row)`
  background-color: ${({ theme }) => theme.colors.border};
  padding: 0px ${rfValuePX(24)};
  padding-top: ${rfValuePX(5)};
  padding-bottom: ${rfValuePX(5)};
  justify-content: center;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
