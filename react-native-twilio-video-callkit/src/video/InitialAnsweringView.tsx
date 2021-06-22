import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Platform
  // , Text
 } from 'react-native';

import { PERMISSIONS, checkMultiple } from 'react-native-permissions';

import VideoCallProfilePicture from './VideoCallProfilePicture';
import { H3 } from '../header/H';

interface Props {
  name: string;
  image: string;
  onCallIgnore: () => void;
  onCallAnswer: () => void;
  callAnswerIcon: any;
  callCutIcon: any;
  soundPlayer: any;
  appState: any;
}

export type PermissionModalType =
  | 'BOTH_DENIED'
  | 'CAMERA_BLOCKED'
  | 'RADIO_BLOCKED'
  | 'BOTH_BLOCKED'
  | 'MEDIA_DENIED'
  | 'MEDIA_BLOCKED'
  | null;

const AnsweringView: React.FC<Props> = ({ name, image, onCallIgnore, onCallAnswer, callAnswerIcon, callCutIcon,
  soundPlayer,
  appState
}) => {

  // console.info('app state ? ', appState);
  // console.info('sound player ? ', soundPlayer);

  const [hasPermission, setHasPermission] = useState<PermissionModalType>(null);
 

  useEffect(() => {
    checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then(statuses => {
      let cameraPermission: string, radioPermission: string;
      if (Platform.OS === 'ios') {
        cameraPermission = statuses[PERMISSIONS.IOS.CAMERA];
        radioPermission = statuses[PERMISSIONS.IOS.MICROPHONE];
        if (radioPermission === 'denied' && cameraPermission === 'denied') {
          setHasPermission('BOTH_DENIED');
        } else if (radioPermission === 'granted' && cameraPermission === 'blocked') {
          setHasPermission('CAMERA_BLOCKED');
        } else if (radioPermission === 'blocked' && cameraPermission === 'granted') {
          setHasPermission('RADIO_BLOCKED');
        } else if (radioPermission === 'blocked' && cameraPermission === 'blocked') {
          setHasPermission('BOTH_BLOCKED');
        } else {
          setHasPermission(null);
        }
      } else {
        cameraPermission = statuses[PERMISSIONS.ANDROID.CAMERA];
        radioPermission = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
        if (radioPermission === 'denied' && cameraPermission === 'denied') {
          setHasPermission('BOTH_DENIED');
        } else if (cameraPermission === 'denied') {
          setHasPermission('CAMERA_BLOCKED');
        } else if (radioPermission === 'denied') {
          setHasPermission('RADIO_BLOCKED');
        }
      }
    });
  }, [hasPermission]);

  useEffect(() => {
    if (appState.currentState !== 'background') {
      soundPlayer.playSoundFile('ringing', 'mp3');
      // soundPlayer.setSpeaker(true);
      const _onFinishedPlayingSubscription = soundPlayer.addEventListener('FinishedPlaying', async () => {
        soundPlayer.playSoundFile('ringing', 'mp3');
        // soundPlayer.setSpeaker(true);
        // Vibration.vibrate(VIBRATE_PATTERN, true);
      });
      return () => {
        // Vibration.cancel();
        soundPlayer.stop();
        _onFinishedPlayingSubscription.remove();
      };
    } else{
      return;
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
     
      <H3 textAlign="center">{`${name} is Calling...`}</H3>
        {/* <Text >{name} is calling</Text> */}

        <VideoCallProfilePicture image={image} />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.callCutIconContainer} onPress={() => onCallIgnore()}>
            {/* <Text>Cut call</Text> */}
            {callCutIcon}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callStartIconContainer}
            onPress={() => {
            //  console.log('')
             onCallAnswer()
            }}>
              {callAnswerIcon}
            {/* <Text>Start</Text> */}

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  callCut: { width: 50, height: 50, marginTop: 10 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  callCutIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  callCutIcon: {
    width: 50,
    height: 50,
  },
  callStartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRadius: 33,
    marginLeft: 100,
  },
  callStartIcon: {
    width: 50,
    height: 50,
    marginRight: 3,
    marginTop: 3,
  },
});
export default AnsweringView;
