import { Column } from "@/src/ui-components/layout/column";
import { BodyMenu } from "@/src/ui-components/text/body";
import { Caption } from "@/src/ui-components/text/caption";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import styled from "styled-components/native";

interface Props {
  editable: boolean;
}

export const InputWrapper = styled(Column)<Props>`
  background-color: ${({ theme, editable }) =>
    editable ? theme.colors.card : "transparent"};
  padding: 0px ${rfValuePX(10)};
  border-radius: 7px;
  padding-bottom: ${rfValuePX(5)};
`;

export const Label = styled(Caption)`
  margin-top: ${rfValuePX(7)};
  margin-bottom: ${rfValuePX(5)};
  opacity: 0.7;
`;

interface Props {
  spadding?: string;
}

export const StyledTextInput = styled.TextInput<Props>`
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  max-height: ${rfValuePX(45)};

  height: ${({ multiline }) => (multiline ? rfValuePX(45) : "auto")};
  text-align: ${({ multiline }) => (multiline ? "center" : "auto")}; ;
`;

export const ErrorText = styled(BodyMenu)`
  margin-bottom: ${rfValuePX(2)};
  color: ${({ theme }) => theme.colors.notification};
`;
