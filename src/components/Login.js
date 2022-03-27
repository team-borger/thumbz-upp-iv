import React from 'react';
import { View, Button, Text } from 'react-native';

const Cat = ({ navigation }) => {
  const name = "Login Page";
  return (
    <View>
      <Text>Hello, this is {name}!</Text>
      <Button
        title="Go to registration"
        onPress={() =>
          navigation.navigate('Register')
        }
      />
    </View>
  );
}

export default Cat;
