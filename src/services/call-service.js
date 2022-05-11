import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';
import ConnectyCube from 'react-native-connectycube';
import CallScreen from "../components/VideoScreen/CallScreen";
import InCallManager from 'react-native-incall-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';

export default class CallService {
  static MEDIA_OPTIONS = { audio: true, video: { facingMode: 'user' } };
  _session = null;
  mediaDevices = [];

  _incomingCallSession = null;

  outgoingCall = new Sound(require('../assets/audio/dialing.mp3'));
  incomingCall = new Sound(require('../assets/audio/calling.mp3'));
  endCall = new Sound(require('../assets/audio/end_call.mp3'));

  showToast = text => {
    const commonToast = Platform.OS === 'android' ? ToastAndroid : Toast;

    commonToast.showWithGravity(text, Toast.LONG, Toast.TOP);
  };

  setMediaDevices() {
    return ConnectyCube.videochat.getMediaDevices().then(mediaDevices => {
      this.mediaDevices = mediaDevices;
    });
  }

  _setUpListeners() {
    ConnectyCube.videochat.onCallListener = this._onCallListener;
    // ConnectyCube.videochat.onAcceptCallListener = this._onAcceptCallListener;
    // ConnectyCube.videochat.onRejectCallListener = this._onRejectCallListener;
    // ConnectyCube.videochat.onStopCallListener = this._onStopCallListener;
    ConnectyCube.videochat.onUserNotAnswerListener = this._onUserNotAnswerListener;
    // ConnectyCube.videochat.onRemoteStreamListener = this._onRemoteStreamListener;
  }

  startCall = async () => {
    let calleesIds = []; // User's ids

    const session_ = await AsyncStorage.getItem('session_')
    if(session_.id == '5757268') calleesIds.push(5744964)
    else calleesIds.push(5757268)

    caleeId = Number(session_.id)

    const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
    const additionalOptions = { bandwidth: 256 };
    this._session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);

    return this._session
      .getUserMedia(CallService.MEDIA_OPTIONS)
      .then((stream) => {
        console.log('on sessionCreate', stream)
        this._session.call({});

        return {calee: caleeId, stream: stream}
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

  _onCallListener = (session, extension) => {
    // const session_ = JSON.parse(await AsyncStorage.getItem('session_'));
    // ConnectyCube.videochat.onCallListener = function (session_, {}) {};
    console.log('_onCallListener 1:', session)
    console.log('_onCallListener 2:', extension)
    this.playSound('incoming');
    this.showToast(`Incoming call!`)
  }

  _onUserNotAnswerListener = (session, userId) => {
    console.log('_onUserNotAnswerListener 1:', session)
    console.log('_onUserNotAnswerListener 2:', userId)
    this.showToast(`${userId} could not answer!`)
  }
}
