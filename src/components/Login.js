import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const Cat = ({ navigation }) => {
  const name = "Login Page";
  return (
    <View>
      <Text>Hello, this is {name}!</Text>
      <Button icon="account" mode="contained" onPress={() => navigation.navigate('Register')}>
        Register
      </Button>
    </View>
  );
}

export default Cat;
