import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cat = ({ navigation }) => {
  let [caleeId, setCalleeId] = React.useState(null);

  caleeId = '5757268'
  let localStream_ = ''
  let session = ''
  let extension = {}

  const connectyCube = () => {
    let calleesIds = []; // User's ids
      calleesIds.push(Number(caleeId))
    const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
    const additionalOptions = { bandwidth: 256 };
    session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);

    const mediaParams = {
      audio: true,
      video: true
    };

    session
      .getUserMedia(mediaParams)
      .then((localStream) => {
        console.log('on sessionCreate', localStream)
        localStream_ = localStream

        initCall()
      })
      .catch((error) => {
        console.error('session error', error)
      });

    // console.log('test', session)
  };

  const initCall = () => {
    session.call(extension, (error) => {
      console.log('xtension: ', extension)
      console.log('err: ', error)

    });
    AsyncStorage.setItem('caleeId', caleeId)
    AsyncStorage.setItem('localStream', JSON.stringify(localStream_))

    navigation.navigate('CallScreen')
  };

  const stopCall = () => {
    session.stop(extension);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(caleeId) => setCalleeId(caleeId)}
        value={caleeId}
        placeholder="Callee ID"
      />
      <Button
        title="Initiate call"
        onPress={() => connectyCube()}
        style={styles.b1}
      />
      <Button
        title="Stop call"
        onPress={() => stopCall()}
        style={styles.b1}
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

export default Cat;
