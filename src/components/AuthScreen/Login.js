import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import { AuthService } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Kek = ({ navigation }) => {
  const name = "Login Page";

  // create session
  ConnectyCube.createSession()

  const onLogin = async (username, password) => {
    console.log('logging in as', username)
    await AuthService.login({ login: username, password: password })
      .then((res) => {
        console.log(res)
        navigation.navigate('Home')
      })
      .catch(() => {
        console.error(error)
      })
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

  // <Text>Hello, this is {username ? username : name }!</Text>
  // <TouchableOpacity onPress={() => navigation.push('')}>
  //     style={[styles.authBtn, styles.centeredChildren]}>
  //     <Text style={styles.authBtnText}>
  //       {"try"}
  //     </Text>
  //   </View>
  // </TouchableOpacity>
  return (
    <View>
      <TouchableOpacity onPress={() => onLogin('anna', 'password')}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"login as 'Anna'"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLogin('eclair', 'password')}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"login as 'Eclair'"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Register"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const onChangeText = () => {
}

const styles = StyleSheet.create({
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  f1: {
    flex: 1,
  },
  authBtn: {
    backgroundColor: 'green',
    height: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 5,
  },
  authBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Kek;
