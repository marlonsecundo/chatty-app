import { useAuth } from "@/src/contexts/auth-context";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import React, { useCallback } from "react";
import Toast from "react-native-root-toast";

const LogoutButton: React.FC = () => {
  const { logoutUser, token } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser({ token: token ?? "" });
    } catch (err) {
      const exception = getExceptionFromError(err);
      Toast.show(exception.message);
    }
  }, []);
  return (
    <IconButton
      onPress={handleLogout}
      icon={<FeatherIcon name="log-out"></FeatherIcon>}
    ></IconButton>
  );
};

export default LogoutButton;
