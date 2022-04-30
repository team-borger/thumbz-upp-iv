import 'expo-dev-client';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'
import Call from './src/components/Call'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} option={{title: 'Login!!'}} />
        <Stack.Screen name="Home" component={Home} option={{title: 'Home!!'}} />
        <Stack.Screen name="Register" component={Register} option={{title: 'Register!!'}} />
        <Stack.Screen name="Call" component={Call} option={{title: 'Call!!'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
