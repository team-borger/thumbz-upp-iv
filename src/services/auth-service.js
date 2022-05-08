import ConnectyCube from 'react-native-connectycube';
import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '../../environment';

export default class AuthService {
  init = () => ConnectyCube.init(...environment.CONNECTYCUBE_CONFIG);

  test = asd => {
    console.log('@test: ', asd)
  };

  login = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user)
        .then(() => {
          ConnectyCube.login(user)
          .then((session) => {
            AsyncStorage.setItem('userId', JSON.stringify(session.id))

            ConnectyCube.chat.connect({ userId: session.id, password: user.password })
            .then((res) => {
              console.log('logged in as', session.login)
            })
            .catch((error) => {
              console.error('on chat error: ', error)
            })
          })
          .catch(reject);
        })
        .then(resolve)
        .catch(reject);
    });
  };

  logout = () => {
    ConnectyCube.logout();
    ConnectyCube.destroySession();
    return true;
  };
}
