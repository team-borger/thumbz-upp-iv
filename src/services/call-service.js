import { Platform, ToastAndroid } from 'react-native';
import ConnectyCube from 'react-native-connectycube';
import CallScreen from "../components/CallScreen";
import InCallManager from 'react-native-incall-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

export default class CallService {
  static MEDIA_OPTIONS = { audio: true, video: { facingMode: 'user' } };
  _session = null;
  mediaDevices = [];

  outgoingCall = new Sound(require('../assets/audio/dialing.mp3'));
  incomingCall = new Sound(require('../assets/audio/calling.mp3'));
  endCall = new Sound(require('../assets/audio/end_call.mp3'));

  setMediaDevices() {
    return ConnectyCube.videochat.getMediaDevices().then(mediaDevices => {
      this.mediaDevices = mediaDevices;
    });
  }

  startCall = async () => {
    let calleesIds = []; // User's ids

    const userId = await AsyncStorage.getItem('userId')
    if(userId == '5757268') calleesIds.push(5744964)
    else calleesIds.push(5757268)

    caleeId = Number(userId)

    const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
    const additionalOptions = { bandwidth: 256 };
    this._session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);

    return this._session
      .getUserMedia(CallService.MEDIA_OPTIONS)
      .then((stream) => {
        console.log('on sessionCreate', stream)
        this._session.call({});

        <CallScreen
          calee={caleeId}
          locStream={stream.toURL()}
        >
        </CallScreen>
        return stream
      })
      .catch((error) => {
        console.error('session error', error)
      });
  };

  stopCall = () => {
    this.stopSounds();

    if (this._session) {
      this.playSound('end')
      this._session.stop({});
      ConnectyCube.videochat.clearSession(this._session.ID);
      this._session = null;
      this.mediaDevices = [];
    }
  };

  playSound = type => {
    switch (type) {
      case 'outgoing':
        this.outgoingCall.setNumberOfLoops(-1);
        this.outgoingCall.play();
        break;
      case 'incoming':
        this.incomingCall.setNumberOfLoops(-1);
        this.incomingCall.play();
        break;
      case 'end':
        this.endCall.play();
        break;

      default:
        break;
    }
  };

  stopSounds = () => {
    if (this.incomingCall.isPlaying()) {
      this.incomingCall.pause();
    }
    if (this.outgoingCall.isPlaying()) {
      this.outgoingCall.pause();
    }
  };
}
