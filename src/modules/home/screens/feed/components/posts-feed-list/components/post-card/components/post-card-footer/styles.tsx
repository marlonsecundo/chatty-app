import { Row } from "@/src/ui-components/layout/row";
import styled from "styled-components/native";

export const Footer = styled(Row)`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;
