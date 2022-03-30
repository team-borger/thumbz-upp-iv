import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const Kek = ({ navigation }) => {
  const name = "Login Page";
  return (
    <View>
      <Text>Hello, this is {name}!</Text>
      <Button
        title="Go to Home"
        onPress={() =>
          navigation.navigate('Home')
        }
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
  b1: {
    marginBottom: 100,
  }
});

export default Kek;