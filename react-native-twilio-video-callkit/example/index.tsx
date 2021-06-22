import { AppRegistry, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { store } from './src/App';
import { setRemoteMessages, getNotifications } from './src/redux/rootActions';
import { callKitEnabled } from './src/constance';
import PushNotification from 'react-native-push-notification';

import App, { initializationOnLoad, handleRemoteMessage } from './src/App';
import { name as appName } from './app.json';

let executed = false;

export const handleCallDecline = () => {
  executed = false;
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    store.dispatch(getNotifications());
    store.dispatch(setRemoteMessages(true));
  
    if (Platform.OS === 'android' && remoteMessage.data.type === 'expert_calling') {
      if (callKitEnabled) {
        if (!executed) {
          handleRemoteMessage(remoteMessage);
          executed = true;
        }
      } else {
        PushNotification.localNotification({
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_notification',
          visibility: 'public',
          id: 0,
          title: remoteMessage.data.title,
          message: remoteMessage.data.body,
          soundName: 'ringing.mp3',
        });
      }
    } else if (Platform.OS === 'android' && remoteMessage.data.type === 'user_cut_call') {
      if (callKitEnabled) {
        // handleUserCutCall();
        executed = false;
      }
    }
  });

AppRegistry.registerComponent(appName, () => App);
