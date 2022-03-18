import React, { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";

import messaging from "@react-native-firebase/messaging";

import DotEnv from "./contants/dotenv";

interface Props {
  dotEnv: DotEnv;
}

const NotificationHandler: React.FC<Props> = ({ dotEnv }) => {
  const firebaseConfigRef = useRef({
    apiKey: dotEnv.FIREBASE_KEY,
    authDomain: `${dotEnv.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${dotEnv.FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: dotEnv.FIREBASE_PROJECT_ID,
    storageBucket: `${dotEnv.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: dotEnv.FIREBASE_PROJECT_NUMBER,
    appId: dotEnv.FIREBASE_APP_ID,
    measurementId: dotEnv.FIREBASE_MEASUREMENT_ID,
  });

  const registerForPushNotification = useCallback(() => {}, []);

  useEffect(() => {
    messaging().requestPermission();

    console.log("sdfd");
  }, []);
  return <View />;
};

export default NotificationHandler;
