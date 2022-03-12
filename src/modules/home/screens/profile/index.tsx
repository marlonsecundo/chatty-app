import { useAuth } from "@/src/contexts/auth-context";
import { useService } from "@/src/contexts/service-context";
import { HomeStackParamList } from "@/src/routes/home.routes";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import { Line } from "@/src/ui-components/line";
import { Body } from "@/src/ui-components/text/body";
import { Subheader } from "@/src/ui-components/text/subheader";
import { formatStringDate } from "@/src/utils/format";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { UpdateProfileSchema } from "@/src/validators/profile.validator";
import { RouteProp, useRoute } from "@react-navigation/core";
import { Formik, FormikHelpers } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import Toast from "react-native-root-toast";
import BackHeaderButton from "../components/back-header-button";
import HeaderBar from "../components/header-bar";
import ProfileMenuDropDown from "./components/profile-menu-drop-down";
import TextProfileFormInput from "./components/text-profile-form-input";
import {
  ProfilePicture,
  ProfileWrapper,
  UsernameText,
  ScrollViewWrapper,
  SubmitButton,
  Loading,
} from "./styles";

export interface ProfileFormValueProps {
  username: string;
  description: string;
  name: string;
}

export interface ProfileScreenProps {
  user?: User | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Profile">>();
  const [user, setUser] = useState(route.params.user);
  const { serviceManager } = useService();

  const { userService } = serviceManager;

  const { user: loggedUser, token, updateUser } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const isLoggedUserView = user?.id === loggedUser?.id;

  const initialValues: ProfileFormValueProps = {
    username: user?.username ?? "-",
    description: user?.profile?.description ?? "no description",
    name: user?.profile?.name ?? "-",
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);

      const responseUser = await userService.showUser({
        token: token ?? "",
        userId: user?.id ?? "",
      });

      setUser(responseUser);
    } catch (err) {
      const exception = getExceptionFromError(err);
      Toast.show(exception.message);
    }

    setRefreshing(false);
  }, [token, user]);

  const onSubmit = useCallback(
    async (
      values: ProfileFormValueProps,
      actions: FormikHelpers<ProfileFormValueProps>
    ) => {
      try {
        const updatedData = await updateUser(token ?? "", {
          username: values.username,
          profile: {
            description: values.description,
            name: values.name,
          },
        });

        Toast.show("Updated!");
      } catch (err) {
        const exception = getExceptionFromError(err);
        Toast.show(exception.message);
      }
    },
    [token]
  );

  const rightHeaderContent = isLoggedUserView ? (
    <ProfileMenuDropDown />
  ) : (
    <LayoutContainer marginRight={rfValuePX(39)} />
  );

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Column height="100%">
      <HeaderBar
        leftContent={<BackHeaderButton></BackHeaderButton>}
        rightContent={rightHeaderContent}
        title="Profile"
        transparent={true}
      ></HeaderBar>

      <Formik<ProfileFormValueProps>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
        validationSchema={UpdateProfileSchema}
      >
        {({ handleSubmit, setErrors, isSubmitting }) => (
          <Column sflex={1}>
            {isSubmitting && <Loading size="large"></Loading>}
            <ScrollViewWrapper
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <ProfileWrapper
                justifyContent="center"
                alignItems="center"
                marginTop={rfValuePX(30)}
                spadding={`0px ${rfValuePX(20)} ${rfValuePX(30)} ${rfValuePX(
                  20
                )}`}
              >
                <ProfilePicture
                  imageUrl={user?.profile?.imageUrl ?? ""}
                ></ProfilePicture>

                <LayoutContainer marginTop={rfValuePX(20)}></LayoutContainer>
                <Subheader>{user?.profile?.name}</Subheader>

                <LayoutContainer
                  marginTop={rfValuePX(5)}
                  marginBottom={rfValuePX(7)}
                >
                  <UsernameText>
                    {user?.username ? `@${user?.username}` : "-"}
                  </UsernameText>
                </LayoutContainer>

                <LayoutContainer width="100%" smargin={rfValuePX(15) + " 0px"}>
                  <TextProfileFormInput
                    textAlign="center"
                    formValueKey="description"
                    multiline={true}
                  ></TextProfileFormInput>
                </LayoutContainer>

                <Line height="1px"></Line>

                <LayoutContainer smargin={rfValuePX(10)}></LayoutContainer>

                <Row width="100%" justifyContent="space-evenly">
                  <Column alignItems="center">
                    <Subheader>{user?.postLikesCount ?? "0"}</Subheader>
                    <Subheader>Likes</Subheader>
                  </Column>

                  <Line width={rfValuePX(1)} height="100%"></Line>

                  <Column alignItems="center">
                    <Subheader>{user?.postsCount ?? "0"}</Subheader>
                    <Subheader>Posts</Subheader>
                  </Column>
                </Row>
              </ProfileWrapper>

              <Column smargin={`0px ${rfValuePX(30)}`}>
                <TextProfileFormInput
                  formValueKey="username"
                  label="username"
                  editable={isLoggedUserView}
                ></TextProfileFormInput>

                <LayoutContainer marginTop={rfValuePX(10)}></LayoutContainer>

                <TextProfileFormInput
                  formValueKey="name"
                  label="name"
                  editable={isLoggedUserView}
                ></TextProfileFormInput>

                <LayoutContainer marginTop={rfValuePX(10)}></LayoutContainer>
              </Column>
            </ScrollViewWrapper>
            {isLoggedUserView && (
              <SubmitButton
                onPress={() => {
                  if (!isSubmitting) handleSubmit();
                }}
              >
                <Body>Update Profile</Body>
              </SubmitButton>
            )}
          </Column>
        )}
      </Formik>
    </Column>
  );
};

export default ProfileScreen;
