import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Kek = ({ navigation }) => {
  const [text, onChangeText] = React.useState(null);
  const name = "Login Page";

  const onLogin = async () => {
    try {
      await AsyncStorage.setItem('userId', text)

      navigation.navigate('Home')
    } catch (e) {
      // saving error
    }
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
  console.log(123)
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
