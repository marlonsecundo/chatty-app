import { useAuth } from "@/src/contexts/auth-context";
import { usePost } from "@/src/contexts/post-context";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import { StorePostSchema } from "@/src/validators/post.validator";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useState } from "react";
import Toast from "react-native-root-toast";
import TextFormInput from "./components/text-form-input";
import { FooterWrapper, ActionsWrapper } from "./styles";
import { MotiView } from "moti";

export interface StorePostFormValueProps {
  content: string;
}

const FeedFooter: React.FC = () => {
  const { storePost, fetchPosts } = usePost();
  const { token } = useAuth();

  const [inputVisible, setInputVisible] = useState(false);

  const onSubmit = useCallback(
    async (
      values: StorePostFormValueProps,
      actions: FormikHelpers<StorePostFormValueProps>
    ) => {
      try {
        const post = await storePost({
          content: values.content,
          token: token ?? "",
        });

        actions.resetForm();

        setInputVisible(false);
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

  const renderAnimatedInput = () => {
    const height = inputVisible ? rfValue(100) : 0;

    return (
      <MotiView animate={{ height }}>
        <LayoutContainer
          overflow="hidden"
          position="absolute"
          width="100%"
          height="100%"
        >
          <TextFormInput></TextFormInput>
        </LayoutContainer>
      </MotiView>
    );
  };

  const renderAnimatedCloseButton = ({ onPress }: { onPress: () => void }) => {
    const opacity = inputVisible ? rfValue(1) : 0;

    return (
      <MotiView animate={{ opacity }}>
        <IconButton
          withBackgroundColor={false}
          onPress={onPress}
          icon={<FeatherIcon name="x"></FeatherIcon>}
        ></IconButton>
      </MotiView>
    );
  };

  return (
    <FooterWrapper>
      <Formik<StorePostFormValueProps>
        initialValues={{ content: "" }}
        onSubmit={onSubmit}
        validationSchema={StorePostSchema}
        validateOnChange={false}
      >
        {({ handleSubmit, setErrors, isSubmitting }) => {
          return (
            <Column
              smargin={`0px ${rfValuePX(10)} ${rfValuePX(10)} ${rfValuePX(10)}`}
            >
              <ActionsWrapper alignItems="center">
                <IconButton
                  withBackgroundColor={false}
                  onPress={() => {
                    if (!inputVisible) {
                      setErrors({ content: "" });

                      setInputVisible(true);
                      return;
                    }

                    if (!isSubmitting) handleSubmit();
                  }}
                  icon={<FeatherIcon name="send"></FeatherIcon>}
                ></IconButton>

                <LayoutContainer sright="0px" position="absolute">
                  {renderAnimatedCloseButton({
                    onPress: () => {
                      if (inputVisible) {
                        setErrors({ content: "" });
                        setInputVisible(false);
                        return;
                      }
                    },
                  })}
                </LayoutContainer>
              </ActionsWrapper>

              {renderAnimatedInput()}
            </Column>
          );
        }}
      </Formik>
    </FooterWrapper>
  );
};

export default FeedFooter;
