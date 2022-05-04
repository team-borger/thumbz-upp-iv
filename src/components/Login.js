import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, Alert } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Kek = ({ navigation }) => {
  let [username, setUsername] = React.useState(null);
  let [password, setPassword] = React.useState(null);
  const name = "Login Page";

  username="eclair"
  password="password"


  // create session
  ConnectyCube.createSession()

  const onLogin = async () => {
    console.log('skek: ', username)
    if(username && password) {
      if(username.trim() != '' || password.trim() != '') {
        await AsyncStorage.setItem('userId', username)

        // connectycube create session by login
        const userCredentials = { login: username, password: password };

        ConnectyCube.login(userCredentials)
          .then((session) => {
            // console.log(session)

            ConnectyCube.chat.connect({ userId: session.id, password: password })
              .then((res) => {
                console.log('on chat connected: ', res)
                navigation.navigate('Home')
              })
              .catch((error) => {
                console.error('on chat error: ', error)
              })
          })
          .catch((error) => {
            console.error(error)
          });
      } else {
        showError()
      }
    } else showError()
  }

  const Alan = ({ aaa }) => {
    return (
      <TextInput
        style={styles.input}
        placeholder={aaa}
      />
    )
  }

  const showError = () => {
    Alert.alert(
      "Error", "Please include username and password",
      [
        {
          username: "Close",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "Ok",
        },
      ],
      {cancelable: false}
    )
  }

  return (
    <View>
      <Text>Hello, this is {username ? username : name }!</Text>
      <Alan
        aaa={'yawa'}
      />
      <TextInput
        style={styles.input}
        onChangeText={(username) => setUsername(username)}
        value={username}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="password"
      />
      <Button
        title="Go to Home"
        onPress={() => onLogin({username})}
        style={styles.b1}
      />
      <Button
        title="Go to registration"
        onPress={() =>
          navigation.navigate('Register')
        }
      />
    </View>
  );
}

const onChangeText = () => {
}

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 50,
  // },
  // bigBlue: {
  //   color: 'blue',
  //   fontWeight: 'bold',
  //   fontSize: 30,
  // },
  // red: {
  //   color: 'red',
  // },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  b1: {
    marginBottom: 100,
  }
});

export default Kek;
