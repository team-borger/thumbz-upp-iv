import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RTCView } from 'react-native-connectycube';

const CallScreen = (response) => {

  const RTCViews = () => {
    const res = response.route.params.response;
    if(res.currentUserID) {
      return (
        <View style={styles.blackView}>
          <RTCView style={styles.rtcView} objectFit="cover" key={res.localKey} streamURL={res.localStream.toURL()} />
          <RTCView style={styles.rtcView} objectFit="cover" key={res.remoteKey} streamURL={res.remoteStream.toURL()} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.blackView}>
          <RTCView style={styles.rtcView} objectFit="cover" key={res.calee} streamURL={res.stream.toURL()} />
        </View>
      );
    }
  };

  return (
    <RTCViews />
  );
};

const styles = StyleSheet.create({
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
  rtcView: {
    height: 150,
    width: 100
  },
});

export default CallScreen;
