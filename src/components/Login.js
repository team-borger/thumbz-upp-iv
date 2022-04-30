import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from './environment.js';
console.log(1, environment.CONNECTYCUBE_CREDENTIALS)

const Kek = ({ navigation }) => {
  const [text, onChangeText] = React.useState(null);
  const name = "Login Page";

  const onLogin = async () => {
    if(text) {
      if(text.trim() != '') {
        await AsyncStorage.setItem('userId', text)

        navigation.navigate('Home')
      } else {
        showError()
      }
    } else showError()
  }

  const showError = () => {
    Alert.alert(
      "Error", "Please include user ID",
      [
        {
          text: "Close",
          // onPress: () => Alert.alert("Cancel Pressed"),
          style: "Ok",
        },
      ],
      {cancelable: false}
    )
  }

  return (
    <View>
      <Text>Hello, this is {text ? text : name }!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="user id"
      />
      <Button
        title="Go to Home"
        onPress={() => onLogin({text})}
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
