import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Body } from "@/src/ui-components/text/body";
import { Caption } from "@/src/ui-components/text/caption";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { StyledTextInput, TextInputWrapper } from "./styles";

import { useFormikContext } from "formik";
import { StorePostFormValueProps } from "../..";

const TextInputForm: React.FC = () => {
  const { errors, handleChange, handleBlur, values, setErrors, setFieldValue } =
    useFormikContext<StorePostFormValueProps>();

  return (
    <Column>
      {errors.content && (
        <LayoutContainer marginBottom={rfValuePX(5)}>
          <Body>{errors.content}</Body>
        </LayoutContainer>
      )}
      <TextInputWrapper alignItems="center" justifyContent="space-between">
        <StyledTextInput
          onChangeText={handleChange("content")}
          onBlur={handleBlur("content")}
          multiline={true}
          value={values.content}
          maxLength={205}
        ></StyledTextInput>

        <Column alignItems="center">
          <IconButton
            onPress={() => {
              setErrors({ content: undefined });
              setFieldValue("content", "");
            }}
            withBackgroundColor={false}
            icon={<FeatherIcon name="x-circle"></FeatherIcon>}
          ></IconButton>
          <Caption>{values.content?.length.toString() ?? "0"}/205</Caption>
        </Column>
      </TextInputWrapper>
    </Column>
  );
};

export default TextInputForm;
