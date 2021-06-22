import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View, Platform, AppState, Text } from 'react-native';

// import CallCutIcon from '../../assets/icons/callCutIcon.svg';
// import CallStartIcon from '../../assets/icons/callStartIcon.svg';
// import { H3 } from '../H';
// import SoundPlayer from 'react-native-sound-player';
// import { VIBRATE_PATTERN } from '../../constance';
// import VideoCallProfilePicture from './VideoCallProfilePicture';
import { PERMISSIONS, checkMultiple } from 'react-native-permissions';
// import { showPermissionModal } from '../../redux/rootActions';
// import { PermissionModalType } from 'src/redux/callLogs/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { getTwillioVideoToken } from '../../redux/app/actions';
import VideoTest from 'react-native-video-call-v1'


export type VideoStatusEnum = 'initial' | 'connecting' | 'connected' | 'disconnecting' | 'disconnected';

export interface TwillioVideoTrackInterface {
  participantSid: string;
  videoTrackSid: string;
}

const AnsweringView = () => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const dispatch = useDispatch();

  const [videoStatus, setVideoStatus] = useState<VideoStatusEnum>('initial');
  const [twillioTrack, setTwillioTrack] = useState<TwillioVideoTrackInterface | null>(null);
  const [isAudioEnabled, setIsAudioEnable] = useState(true);
  const twilioVideoRef: any = useRef();
  const currentCall = useSelector((state: RootState) => state.app.currentCall);
  const currentCallType = useSelector((state: RootState) => state.app.currentCallType);
  const callAnswered = useSelector((state: RootState) => state.app.callAnswered);
  const isInExpertView = useSelector((state: RootState) => state.app.isInExpertView);

  const [token, setToken] = useState("");

  const onCallAnswer = useCallback(async () => {
    if (currentCall && currentCall.callLogId) {
      const token = await dispatch(getTwillioVideoToken());
      if (token) {
        setToken(token);
        setVideoStatus('connecting');
        twilioVideoRef.current.connect({ roomName: currentCall.callLogId, accessToken: token });
        twilioVideoRef.current.toggleSoundSetup(false);
      } else {
        console.log("video token not found");
      }
    }
  }, [currentCall, dispatch]);

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
        <Text >{currentCall.booking.expert.name} is calling</Text>
       
       
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.callCutIconContainer} onPress={() => props.onCallIgnore()}>
           
            <Text>End Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callStartIconContainer}
            onPress={() => {
              if (hasPermission) {
               onCallAnswer();
               
              } else {
                // props.onCallAnswer();
              }
            }}>
              <Text>Answer</Text>
        
          </TouchableOpacity>
        </View>
      </View>

      <VideoTest 
          roomName={currentCall.callLogId} 
          accessToken={token}
          status={videoStatus}
          videoRef={twilioVideoRef}
          twillioTrack={twillioTrack}
          setTwillioTrack={setTwillioTrack}
          // onEndButtonPress={_onEndButtonPress}
          // onMuteButtonPress={_onMuteButtonPress}
          isAudioEnabled={isAudioEnabled}
          // onCameraSwitch={onCameraSwitch}
          // onSoundToggle={onSoundToggle}
        >

        </VideoTest>

    </View>
  );
};
const styles = StyleSheet.create({
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
