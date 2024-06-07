import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import AuthContent from '../Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../UI/LoadingOverlay';
import { login } from '../Util/Auth';

const logo = require('../assets/DataRhythmLogo.jpg');


function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);
  
    async function loginHandler({ email, password }) {
      setIsAuthenticating(true);
      await login(email, password);
      setIsAuthenticating(false);
    }
  
    return (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} resizeMode='contain' />
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
    fontSize: 40,
    color: "white",
    marginBottom: 20,
  },
  logo: {
    width: 350,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
