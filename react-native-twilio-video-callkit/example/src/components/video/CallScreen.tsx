import { PERMISSIONS, checkMultiple } from 'react-native-permissions';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, AppState } from 'react-native';

import SoundPlayer from 'react-native-sound-player';
import VideoView, { TwillioVideoTrackInterface } from './VideoView';
import {
  clearExpertUpcomingBookings,
  getExpertUpcomingBookings,
  setCallAnswered,
  showPermissionModal,
  updateCallStatus,
} from '../../redux/rootActions';
import { useDispatch, useSelector } from 'react-redux';

import CallCutIcon from '../../assets/icons/callCutIcon.svg';
import CallStartIcon from '../../assets/icons/callStartIcon.svg';
import SwitchCameraIcon from '../../assets/icons/switchCameraIcon.svg';
import MuteIcon from '../../assets/icons/muteIcon.svg';
import MuteRed from '../../assets/icons/muteRed.svg';

import CallConnecting from './CallConnecting';
import InCallManager from 'react-native-incall-manager';
import InitialCallingView from './InitialCallingView';
// import HeadphoneDetection from 'react-native-headphone-detection';
// import KeepAwake from 'react-native-keep-awake';
import { RootState } from '../../redux/rootReducer';
// import { TwilioVideo } from 'react-native-twilio-video-webrtc';
// import VideoTest from 'react-native-video-call-v1'

import Video from 'react-native-twilio-video-test';

import { getTwillioVideoToken } from '../../redux/app/actions';
import { handleCallDecline } from '../../../index';
import { logger } from '../../utils';

export type VideoStatusEnum = 'initial' | 'connecting' | 'connected' | 'disconnecting' | 'disconnected';

interface Props {
  isBluetoothConnected: boolean;
  isHeadphoneConnected: boolean;
}

const CallScreen: React.FC<Props> = ({ isHeadphoneConnected, isBluetoothConnected}) => {
  const [videoStatus, setVideoStatus] = useState<VideoStatusEnum>('initial');
  const [twillioTrack, setTwillioTrack] = useState<TwillioVideoTrackInterface | null>(null);
  const [isAudioEnabled, setIsAudioEnable] = useState(true);
  const twilioVideoRef: any = useRef();
  const currentCall = useSelector((state: RootState) => state.app.currentCall);
  const currentCallType = useSelector((state: RootState) => state.app.currentCallType);
  const callAnswered = useSelector((state: RootState) => state.app.callAnswered);
  const isInExpertView = useSelector((state: RootState) => state.app.isInExpertView);

  // temp
  const [token, setToken] = useState<string>("");

  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();

  const onCallAnswer = useCallback(async () => {
    if (currentCall && currentCall.callLogId) {
      const token = await dispatch(getTwillioVideoToken());
      if (token) {
        setToken(token);
        setVideoStatus('connecting');
        twilioVideoRef.current.connect({ roomName: currentCall.callLogId, accessToken: token });
        twilioVideoRef.current.toggleSoundSetup(false);
      } else {
        logger.error('onCallAnswer: token not found');
      }
    }
  }, [currentCall, dispatch]);

  useEffect(() => {
    const currentTwilioVideoRef = twilioVideoRef.current;
    
    console.info('outgoing call ? ', currentCallType, currentTwilioVideoRef);
    
    if (currentCallType === 'outgoing') {
      onCallAnswer();
    }

    return () => {
      currentTwilioVideoRef && currentTwilioVideoRef.disconnect();
      // KeepAwake.deactivate();
    };
  }, [currentCallType, dispatch, isInExpertView, onCallAnswer]);

  const onCutCallAfterConnect = async () => {
    twilioVideoRef.current.disconnect();
    setTwillioTrack(null);
    await dispatch(updateCallStatus('CALL_ENDED'));
    if (isInExpertView) {
      dispatch(clearExpertUpcomingBookings());
      dispatch(getExpertUpcomingBookings());
    }
  };

  const appEndingCall = async () => {
    twilioVideoRef.current.disconnect();
    setTwillioTrack(null);
    dispatch(updateCallStatus('ENDED_BY_APP'));
    if (isInExpertView) {
      dispatch(clearExpertUpcomingBookings());
      dispatch(getExpertUpcomingBookings());
    }
  };

  const onCameraSwitch = () => {
    twilioVideoRef.current.flipCamera();
  };

  const onMicSwitch = async () => {
    try {
      const enable = await twilioVideoRef.current.setLocalAudioEnabled(!isAudioEnabled);
      setIsAudioEnable(enable);
    } catch (error) {
      logger.error('onMicSwitch error', error);
    }
  };

  useEffect(() => {
    if (callAnswered) {
      checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then(statuses => {
        let cameraPermission = statuses[PERMISSIONS.ANDROID.CAMERA];
        let radioPermission = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
        if (cameraPermission === 'granted' && radioPermission === 'granted') {
          dispatch(updateCallStatus('CALL_ANSWERED'));
          onCallAnswer();
        } else if (cameraPermission !== 'granted' && radioPermission !== 'granted') {
          dispatch(updateCallStatus('CALL_REJECTED'));
          dispatch(showPermissionModal('BOTH_DENIED'));
          handleCallDecline();
        } else if (cameraPermission !== 'granted') {
          dispatch(updateCallStatus('CALL_REJECTED'));
          dispatch(showPermissionModal('CAMERA_BLOCKED'));
          handleCallDecline();
        } else if (radioPermission !== 'granted') {
          dispatch(updateCallStatus('CALL_REJECTED'));
          dispatch(showPermissionModal('RADIO_BLOCKED'));
          handleCallDecline();
        }
      });
    }
  }, [callAnswered, currentCall, dispatch, onCallAnswer]);

  useEffect(() => {
    return () => {
      dispatch(setCallAnswered(false));
    };
  });

  // useEffect(() => {
  //   if (twillioTrack) {
  //     InCallManager.setSpeakerphoneOn(true);
  //   }
  // }, [twillioTrack]);

  const _onEndButtonPress = () => {
    setVideoStatus("disconnected");
    onCutCallAfterConnect();
    handleCallDecline();
    // props.navigation.goBack();
  };

  const onCallIgnore = () => {
    dispatch(updateCallStatus('CALL_REJECTED'))
  }

  const onCallCut = () => {
    console.info('call cut before answer ? ');
    dispatch(updateCallStatus('CALL_CUT_BEFORE_ANSWER'))
  }

  return (
  
      <Video
        twilioVideoRef={twilioVideoRef}
        videoStatus={videoStatus}
        setVideoStatus={setVideoStatus}
        currentCall={currentCall}
        currentCallType={currentCallType}
        twillioTrack={twillioTrack}
        setTwillioTrack={setTwillioTrack}
        onCutCallAfterConnect={onCutCallAfterConnect}
        dipatchOnCutCall={onCallCut}
        dispatchOnCallIgnore={onCallIgnore}
        dispatchOnCallAnswer={() => {
          dispatch(updateCallStatus('CALL_ANSWERED'));
          onCallAnswer();
        }}
        handleCallDecline={handleCallDecline}
        onMicSwitch={onMicSwitch}
        isAudioEnabled={isAudioEnabled}
        onCameraSwitch={onCameraSwitch}
        soundPlayer={SoundPlayer}
        appState={AppState}
        inCallManager={InCallManager}
        isHeadphoneConnected={isHeadphoneConnected}
        isBluetoothConnected={isBluetoothConnected}
      >
        <CallCutIcon></CallCutIcon>
        <CallStartIcon></CallStartIcon>
        <SwitchCameraIcon></SwitchCameraIcon>
        <MuteIcon></MuteIcon>
        <MuteRed></MuteRed>
      </Video>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CallScreen;
