import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import AuthContent from '../Auth/AuthContent';
import LoadingOverlay from '../UI/LoadingOverlay';
import { login } from '../Util/Auth';
import { AuthContext } from '../Store/Auth-context';

const logo = require('../assets/DataRhythmLogo.jpg');

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.welcomeText}>Welcome!</Text>
      {isAuthenticating ? (
        <LoadingOverlay message="Logging you in..." />
      ) : (
        <AuthContent isLogin onAuthenticate={loginHandler} />
      )}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 55,
    color: '#ADD8E6',
    marginBottom: -60,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  logo: {
    width: 300,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#00B5B9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00B5B9',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
});
