import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import {RTCView} from 'react-native-connectycube';

const Cat = () => {
  let [caleeId, setCalleeId] = React.useState(null);

  caleeId = '5757268'
  let localStream_ = ''
  let session = ''

  const connectyCube = () => {
    const calleesIds = [5757268]; // User's ids
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
    const extension = {};
    session.call(extension, (error) => {
      console.log('xtension: ', extension)
      console.log('err: ', error)
    });
  };

  const CallView = ({caleeId, localStream}) => {
    if(localStream != '') {
      return <RTCView  objectFit="cover" style={styles.rtcView} key={caleeId} streamURL={localStream.toURL()} />;
    }
    else return null;
  }

  return (
    <View>
      <CallView
        caleeId={caleeId}
        localStream={localStream_}
      />
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
