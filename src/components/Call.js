import React from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthService } from './../services';
import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CallScreen from "../components/CallScreen";
const Cat = ({ navigation }) => {
  // let [lStream, setLocSteam] = React.useState(null);

  let caleeId = ''
  let localStream_ = ''
  let session = ''
  let extension = {}

  const connectyCube = async () => {
    let calleesIds = []; // User's ids

    const userId = await AsyncStorage.getItem('userId')
    if(userId == '5757268') calleesIds.push(5744964)
    else calleesIds.push(5757268)

    caleeId = Number(userId)

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
        // setLocSteam(localStream_)
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
    // AsyncStorage.setItem('caleeId', caleeId)
    // AsyncStorage.setItem('localStream', JSON.stringify(localStream_))
    <CallScreen
      calee={caleeId}
      locStream={localStream_.toURL()}
    >
    </CallScreen>
    navigation.navigate('CallScreen')
    // console.log("asdsa", localStream_.toURL())
  };

  const stopCall = () => {
    session.stop(extension);
  };

  const logout = () => {
    AuthService.logout()
    navigation.navigate('Login')
  };

  return (
    <View>
      <TouchableOpacity onPress={() => connectyCube()}>
        <View
          style={[styles.authBtn, styles.centeredChildren]}>
          <Text style={styles.authBtnText}>
            {"Initiate call"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => stopCall()}>
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

export default Cat;
