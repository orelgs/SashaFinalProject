import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import login from "./../Utils/Auth";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
  const [isInProgress, setIsInProgress] = useState(false);
  const webClientId =
    "298562885659-q1ejopelglb5lmv9sg7i2j2p068f2n3m.apps.googleusercontent.com";

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  }, []);

  const googleLogin = async () => {
    try {
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Attempt login
      const result = await login(userInfo["idToken"]);
      // Save user sessionId
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    } finally {
      setIsInProgress(false);
    }
  };
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleLogin}
      disabled={isInProgress}
    />
  );
};

const styles = StyleSheet.create({
  loginButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: screenWidth - 50,
    height: 48,
    borderRadius: 10,
  },
});

export default LoginScreen;
