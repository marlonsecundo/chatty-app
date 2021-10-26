import { useAuth } from "@/src/contexts/auth-context";
import { usePost } from "@/src/contexts/post-context";
import { StorePostProps } from "@/src/services/post.service";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Body } from "@/src/ui-components/text/body";
import { Caption } from "@/src/ui-components/text/caption";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { StorePostSchema } from "@/src/validators/post.validator";
import { Formik } from "formik";
import React, { useCallback } from "react";
import Toast from "react-native-root-toast";
import TextInputForm from "./components/text-input-form";
import { FooterWrapper, ActionsWrapper } from "./styles";

export interface StorePostFormValueProps {
  content: string;
}

const Footer: React.FC = () => {
  const { storePost } = usePost();
  const { token } = useAuth();

  const onSubmit = useCallback(
    async (values: StorePostFormValueProps) => {
      try {
        const post = await storePost({
          content: values.content,
          token: token ?? "",
        });
      } catch (err) {
        const exception = getExceptionFromError(err);

        Toast.show(exception.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    },
    [token]
  );

  return (
    <FooterWrapper>
      <Formik<StorePostFormValueProps>
        initialValues={{ content: "" }}
        onSubmit={onSubmit}
        validationSchema={StorePostSchema}
        validateOnChange={false}
      >
        {({ handleSubmit }) => {
          return (
            <Column
              smargin={`0px ${rfValuePX(10)} ${rfValuePX(10)} ${rfValuePX(10)}`}
            >
              <ActionsWrapper>
                <IconButton
                  withBackgroundColor={false}
                  onPress={() => handleSubmit()}
                  icon={<FeatherIcon name="send"></FeatherIcon>}
                ></IconButton>
              </ActionsWrapper>

              <TextInputForm></TextInputForm>
            </Column>
          );
        }}
      </Formik>
    </FooterWrapper>
  );
};

export default Footer;
