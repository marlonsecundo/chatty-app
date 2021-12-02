import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

export const PostWrapper = styled(LayoutContainer)`
  background-color: ${({ theme }) => theme.colors.card};

  width: 100%;
  overflow: hidden;
`;
