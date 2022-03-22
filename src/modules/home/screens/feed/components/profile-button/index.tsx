import { useAuth } from "@/src/contexts/auth-context";
import { HomeStackNavProps } from "@/src/routes/home.routes";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ProfileImage, StyledButton } from "./styles";

const ProfileButton: React.FC = () => {
  const navigation = useNavigation<HomeStackNavProps>();
  const { user } = useAuth();

  const onProfilePress = useCallback(() => {
    navigation.navigate("Profile", { user: user });
  }, []);

  return (
    <StyledButton onPress={onProfilePress}>
      <ProfileImage imageUrl={user?.profile?.imageUrl ?? ""}></ProfileImage>
    </StyledButton>
  );
};

export default ProfileButton;
