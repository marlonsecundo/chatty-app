import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { Row } from "@/src/ui-components/layout/row";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Body } from "@/src/ui-components/text/body";
import { Caption } from "@/src/ui-components/text/caption";
import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { StyledTextInput, TextInputWrapper } from "./styles";

import { useFormikContext } from "formik";
import { StorePostFormValueProps } from "../..";
import { AnimatePresence, MotiView } from "moti";

const TextFormInput: React.FC = () => {
  const { errors, handleChange, handleBlur, values, setErrors, setFieldValue } =
    useFormikContext<StorePostFormValueProps>();

  const renderAnimatedError = () => {
    const translateY = errors.content ? 0 : rfValue(30);

    return (
      <MotiView animate={{ translateY }}>
        <LayoutContainer position="absolute">
          <Body>{errors.content}</Body>
        </LayoutContainer>
      </MotiView>
    );
  };

  return (
    <Column sflex={1}>
      <Row justifyContent="space-between" marginBottom={rfValuePX(7)}>
        {renderAnimatedError()}
        <Caption>{values.content?.length.toString() ?? "0"}/205</Caption>
      </Row>

      <TextInputWrapper alignItems="center" justifyContent="space-between">
        <StyledTextInput
          onChangeText={handleChange("content")}
          onBlur={handleBlur("content")}
          multiline={true}
          value={values.content}
          maxLength={205}
        ></StyledTextInput>
      </TextInputWrapper>
    </Column>
  );
};

export default TextFormInput;
