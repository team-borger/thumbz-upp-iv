import 'expo-dev-client';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectyCube from 'react-native-connectycube';
import environment from './environment.js';


// initialize connectycube
const CONFIG = {
  mode: 1,
  on: {
    sessionExpired: (handleResponse, retry) => {
      // call handleResponse() if you do not want to process a session expiration,
      // so an error will be returned to origin request
      // handleResponse();

      // JS SDK v1
      ConnectyCube.createSession((error, session) => {
        retry(session);
      });

      // JS SDK v2+
      ConnectyCube.createSession()
        .then(retry)
        .catch((error) => {});
    },
  },
};

console.log(1, environment.CONNECTYCUBE_CREDENTIALS)
ConnectyCube.init(environment.CONNECTYCUBE_CREDENTIALS, CONFIG)



import Login from './src/components/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'
import Call from './src/components/Call'
import CallScreen from './src/components/CallScreen'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
