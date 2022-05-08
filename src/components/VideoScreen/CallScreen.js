import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RTCView } from 'react-native-connectycube';
// let caleeId = ''
// let localStream = {}

const CallScreen = (response) => {
  const rtc = response.route.params.response

  return (
    <View style={styles.blackView}>
      <RTCView objectFit="cover" key={rtc.calee} streamURL={rtc.stream.toURL()} />
    </View>
  );
};

const styles = StyleSheet.create({
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default CallScreen;
