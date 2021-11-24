import { useAuth } from "@/src/contexts/auth-context";
import { FeedScreenProps } from "@/src/routes/home.routes";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ProfileImage, StyledButton } from "./styles";

const ProfileButton: React.FC = () => {
  const navigation = useNavigation<FeedScreenProps>();
  const { user } = useAuth();

  const onProfilePress = useCallback(() => {
    navigation.navigate("Profile");
  }, []);

  return (
    <StyledButton onPress={onProfilePress}>
      <ProfileImage imageUrl={user?.profile?.imageUrl ?? ""}></ProfileImage>
    </StyledButton>
  );
};

export default ProfileButton;