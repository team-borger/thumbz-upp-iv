import 'expo-dev-client';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './src/components/RootNavigation';
import {AuthService} from './src/services';
import Login from './src/components/AuthScreen/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'
import Call from './src/components/VideoScreen/Call'
import CallScreen from './src/components/VideoScreen/CallScreen'

import AuthScreen from './src/components/AuthScreen'
import VideoScreen from './src/components/VideoScreen'

AuthService.init();

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} option={{title: 'Login!!'}} />
        <Stack.Screen name="Home" component={Home} option={{title: 'Home!!'}} />
        <Stack.Screen name="Register" component={Register} option={{title: 'Register!!'}} />
        <Stack.Screen name="Call" component={Call} option={{title: 'Call!!'}} />
        <Stack.Screen name="CallScreen" component={CallScreen} option={{title: 'CallScreen!!'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
