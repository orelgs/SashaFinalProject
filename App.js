import {React, useContext, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PickerScreen from './Screens/PickerScreen';
import SliderScreen from './Screens/SliderScreen';
import HomeScreen from './Screens/HomeScreen';
import ThankYouScreen from './Screens/ThankYouScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import AuthContextProvider, { AuthContext } from './Store/Auth-context';
import IconButton from './UI/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
          Alert.alert('Permission required for push notifications.');
          return;
      }

    const pushTokenData = await Notifications.getExpoPushTokenAsync({
      projectId: '79b36258-b06d-46f2-b70c-0b46003fd09d',
    });
    console.log('pushtoken', pushTokenData);

    if(Platform.OS === 'android'){
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT
      });
    }
    }
    configurePushNotifications();

  }, []);

  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }} />
        <Stack.Screen name="Question1" component={PickerScreen} 
            initialParams={{ question: 'When did you go to sleep?',
            nextScreen: 'Question2',
            defaultHour: "22",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question2" component={PickerScreen}
            initialParams={{ question: 'When did you wake up?',
            nextScreen: 'Question3',
            defaultHour: "08",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question3" component={SliderScreen}
            initialParams={{ question: 'How good was your sleep?',
            nextScreen: 'Question4' }} />
        <Stack.Screen name="Question4" component={SliderScreen}
            initialParams={{ question: 'How do you feel now? Rate your mood.',
            nextScreen: 'Question5' }} />
        <Stack.Screen name="Question5" component={PickerScreen}
            initialParams={{ question: 'When was your first meal yesterday?',
            nextScreen: 'Question6',
            defaultHour: "09",
            defaultMinute: "00" }} />
        <Stack.Screen name="Question6" component={PickerScreen}
            initialParams={{ question: 'When was your last meal yesterday?',
            nextScreen: 'ThankYou',
            defaultHour: "21",
            defaultMinute: "00" }} />
        <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      </Stack.Navigator>
  );
}
