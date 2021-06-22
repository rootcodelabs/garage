import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View, Platform, AppState, Text } from 'react-native';

// import CallCutIcon from '../../assets/icons/callCutIcon.svg';
import CallStartIcon from '../../assets/icons/callStartIcon.svg';

// import CallEndIcon from 'react-native-vector-icons/MaterialIcons';
// import CallAnswerIcon from 'react-native-vector-icons/MaterialIcons';

import CallCutIcon from '../../assets/icons/callCutIcon.svg';

import { H3 } from '../../components/header/H';
// import SoundPlayer from 'react-native-sound-player';
import { VIBRATE_PATTERN } from '../../constance';
import VideoCallProfilePicture from './VideoCallProfilePicture';
import { PERMISSIONS, checkMultiple } from 'react-native-permissions';
import { showPermissionModal } from '../../redux/rootActions';
import { PermissionModalType } from '../../redux/callLogs/reducers';
import { useDispatch } from 'react-redux';

interface Props {
  name: string;
  image: string;
  onCallIgnore: () => void;
  onCallAnswer: () => void;
}

const AnsweringView: React.FC<Props> = ({ name, image, onCallIgnore, onCallAnswer }) => {
  const [hasPermission, setHasPermission] = useState<PermissionModalType>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (AppState.currentState !== 'background') {
  //     SoundPlayer.playSoundFile('ringing', 'mp3');
  //     SoundPlayer.setSpeaker(true);
  //     const _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', async () => {
  //       SoundPlayer.playSoundFile('ringing', 'mp3');
  //       SoundPlayer.setSpeaker(true);
  //       Vibration.vibrate(VIBRATE_PATTERN, true);
  //     });
  //     return () => {
  //       Vibration.cancel();
  //       SoundPlayer.stop();
  //       _onFinishedPlayingSubscription.remove();
  //     };
  //   }
  // }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <H3 textAlign="center">{`${name} is Calling...`}</H3>
        {/* <Text >{name} is calling</Text> */}
        <VideoCallProfilePicture image={image} />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.callCutIconContainer} onPress={() => onCallIgnore()}>
            {/* <CallCutIcon style={styles.callCutIcon} /> */}
            {/* <CallEndIcon name="call-end" size={50} color="#bf1313" />  */}
            <CallCutIcon style={styles.callCut} />
            {/* <Text>Cut call</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callStartIconContainer}
            onPress={() => {
              if (hasPermission) {
                onCallIgnore();
                dispatch(showPermissionModal(hasPermission));
              } else {
                onCallAnswer();
              }
            }}>
            <CallStartIcon style={styles.callStartIcon} />
            {/* <Text>Start</Text> */}

            {/* <CallEndIcon name="call" size={50} color="#bf1313" />  */}
          

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
