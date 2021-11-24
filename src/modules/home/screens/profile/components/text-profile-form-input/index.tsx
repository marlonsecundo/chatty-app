import { Column } from "@/src/ui-components/layout/column";
import { Body } from "@/src/ui-components/text/body";
import { useFormikContext } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ProfileFormValueProps } from "../..";

import { InputWrapper, Label, StyledTextInput, ErrorText } from "./styles";

interface Props {
  label?: string;
  formValueKey: string;
  width?: string;
  multiline?: boolean;
  textAlign?: "center" | "left" | "right";
  spadding?: string;
}
import { useHeaderHeight } from "@react-navigation/elements";

const TextProfileFormInput: React.FC<Props> = ({
  label,
  formValueKey,
  width = "100%",
  textAlign,
  multiline,
  spadding,
}) => {
  const { errors, handleChange, handleBlur, getFieldProps } =
    useFormikContext<any>();

  const { value } = getFieldProps(formValueKey);

  const error = errors[formValueKey];

  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Column width={width}>
        {error && <ErrorText>{error}</ErrorText>}
        <InputWrapper>
          {label && <Label>{label}</Label>}
          <StyledTextInput
            onChangeText={handleChange(formValueKey)}
            onBlur={handleBlur(formValueKey)}
            value={value}
            textAlign={textAlign}
            multiline={multiline}
            textAlignVertical={multiline ? "center" : "auto"}
          ></StyledTextInput>
        </InputWrapper>
      </Column>
    </KeyboardAvoidingView>
  );
};

export default TextProfileFormInput;
