import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PickerScreen from './Screens/PickerScreen';
import SliderScreen from './Screens/SliderScreen';
import HomeScreen from './Screens/HomeScreen';
import ThankYouScreen from './Screens/ThankYouScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your auth logic

  return (
    //<NavigationContainer>
    // {isAuthenticated ? <AuthenticatedNavigator /> : <AuthNavigator />}
    <NavigationContainer>
    <AuthNavigator/>
    </NavigationContainer>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function AuthenticatedNavigator() {
  return (
    <NavigationContainer>
      <AuthStack />
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Question1" component={PickerScreen} 
            initialParams={{ question: 'When did you go to sleep?',
            nextScreen: 'Question2',
            defaultHour: "22",
            defaultMinute: "00" }} />
        <MainStack.Screen name="Question2" component={PickerScreen}
            initialParams={{ question: 'When did you wake up?',
            nextScreen: 'Question3',
            defaultHour: "08",
            defaultMinute: "00" }} />
        <MainStack.Screen name="Question3" component={SliderScreen}
            initialParams={{ question: 'How good was your sleep?',
            nextScreen: 'Question4' }} />
        <MainStack.Screen name="Question4" component={SliderScreen}
            initialParams={{ question: 'How do you feel now? Rate your mood.',
            nextScreen: 'Question5' }} />
        <MainStack.Screen name="Question5" component={PickerScreen}
            initialParams={{ question: 'When was your first meal yesterday?',
            nextScreen: 'Question6',
            defaultHour: "09",
            defaultMinute: "00" }} />
        <MainStack.Screen name="Question6" component={PickerScreen}
            initialParams={{ question: 'When was your last meal yesterday?',
            nextScreen: 'ThankYou',
            defaultHour: "21",
            defaultMinute: "00" }} />
        <MainStack.Screen name="ThankYou" component={ThankYouScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
