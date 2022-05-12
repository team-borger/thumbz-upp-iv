import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthService, CallService } from '../../services';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Cat = ({ navigation }) => {

  const startCall = () => {
    CallService.startCall()
    .then(response => {
      console.log(111111111111111111, response)
      navigation.navigate('CallScreen', {response: response})
    })
  };

  const acceptCall = () => {
    CallService.acceptCall()
    .then(response => {
      navigation.navigate('CallScreen', {response: response})
    })
  };

  const onStopCallButtonClicked = () => {
    CallService.stopCall()
  };

  const logout = () => {
    AuthService.logout()
    navigation.navigate('Login')
  };

  return (
    <View>
      <TouchableOpacity onPress={() => startCall()}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Initiate call"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => acceptCall()}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Accept call"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onStopCallButtonClicked()}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Stop call"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Logout"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default Cat;
