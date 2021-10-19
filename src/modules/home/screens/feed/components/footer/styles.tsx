import { RowContainer } from "@/src/ui-components/layout/row-container";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const FooterWrapper = styled.View`
  position: absolute;
  width: 100%;
  z-index: 1;
  bottom: 0px;
`;

export const ActionsWrapper = styled(RowContainer)`
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${rfValuePX(8)} ${rfValuePX(24)};
  padding-top: ${rfValuePX(15)};
  justify-content: center;
`;

export const StyledBorder = styled.View`
  width: 100%;
  height: 11px;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transform: translateY(10px);
  z-index: 1;
`;
