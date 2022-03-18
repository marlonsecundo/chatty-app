import { useAuth } from "@/src/contexts/auth-context";
import { STATUS_OK } from "@/src/core/contants/axios-response-status";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import React, { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { RFPercentage } from "react-native-responsive-fontsize";
import Toast from "react-native-root-toast";
import { StyledMenuItem } from "./styles";

const ProfileMenuDropDown: React.FC = () => {
  const { cancelAccount, token } = useAuth();

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const handleCancelAccount = useCallback(async () => {
    const response = await cancelAccount({ token: token ?? "" });

    if (response.status === STATUS_OK) {
      Toast.show("Account deleted successfully");
    }
  }, []);

  const cancelAccountOnPress = useCallback(async () => {
    try {
      Alert.alert(
        "Confirmation",
        "Do you want to cancel the account and erase all data?",
        [
          {
            text: "NO",
            onPress: () => {},
            style: "cancel",
          },
          { text: "YES", onPress: handleCancelAccount },
        ]
      );
    } catch (error) {}
  }, []);

  return (
    <Menu
      visible={visible}
      anchor={
        <IconButton
          onPress={showMenu}
          withBackgroundColor={false}
          icon={<FeatherIcon name="more-horizontal"></FeatherIcon>}
        ></IconButton>
      }
      onRequestClose={hideMenu}
    >
      <StyledMenuItem onPress={cancelAccountOnPress}>
        Cancelar Conta
      </StyledMenuItem>
    </Menu>
  );
};

export default ProfileMenuDropDown;
