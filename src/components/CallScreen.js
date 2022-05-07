import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RTCView} from 'react-native-connectycube';

let caleeId = ''
let localStream = {}

const callInfo = () => {
  caleeId = AsyncStorage.getItem('caleeId')
  localStream = JSON.parse(AsyncStorage.getItem('localStream'))
};

const CallScreen = () => {

    return (
       <RTCView  objectFit="cover" style={styles.rtcView} key={caleeId} streamURL={localStream.toURL()} />
   );
};

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
          padding: 40,
        }
      });

export default CallScreen;
