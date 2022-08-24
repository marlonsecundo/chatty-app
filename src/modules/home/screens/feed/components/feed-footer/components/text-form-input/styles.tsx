import { Row } from "@/src/ui-components/layout/row";
import { rfPercentage, rfValuePX } from "@/src/utils/responsive-fontsize";

import styled from "styled-components/native";

export const TextInputWrapper = styled(Row)`
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.card};

  padding: ${rfValuePX(10)} ${rfValuePX(10)};

  flex: 1;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${rfValuePX(20)};
  text-align: justify;
  max-height: ${rfPercentage(20)}px;
`;
