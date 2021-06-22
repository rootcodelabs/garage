import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';

// import CallCutIcon from '../../assets/icons/callCutIcon.svg';
// import CallTimeCounting from './CallCountDown';
// import MuteIcon from '../../assets/icons/muteIcon.svg';
// import MuteRed from '../../assets/icons/muteRed.svg';
import React from 'react';
// import SwitchCameraIcon from '../../assets/icons/switchCameraIcon.svg';

export interface TwillioVideoTrackInterface {
  participantSid: string;
  videoTrackSid: string;
}
interface Props {
  status: string | null;
  isAudioEnabled: boolean;
  track: TwillioVideoTrackInterface | null;
  expireInMinutes: number;
  onCutCall: () => void;
  onMicSwitch: () => void;
  onCameraSwitch: () => void;
  setTimer: (timer: number) => void;
  timer: number;
}

const VideoView: React.FC<Props> = ({
  status,
  track,
  onCutCall,
  expireInMinutes,
  isAudioEnabled,
  onMicSwitch,
  onCameraSwitch,
  timer,
  setTimer,
}) => {
  const isConnected = status === 'connected';
  if (!isConnected) {
    return null;
  }
  return (
    <View style={styles.callContainer}>
      <TwilioVideoLocalView enabled={true} style={!track ? styles.remoteVideo : styles.localVideo} />
      <View style={styles.remoteGrid}>
        {track && (
          <TwilioVideoParticipantView
            style={track ? styles.remoteVideo : styles.localVideo}
            key={track.videoTrackSid}
            trackIdentifier={track}
          />
        )}
      </View>

      

      <TouchableOpacity style={styles.cutButton} onPress={() => onCutCall()}>
        <Text>Cut</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => onCameraSwitch()}>
          {/* <SwitchCameraIcon /> */}
          <Text>Camera toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => onMicSwitch()}>
          {isAudioEnabled ? <Text>Mute</Text> :  <Text>UnMute</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  localVideo: {
    flex: 1,
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1000,
    right: 16,
    top: Platform.OS === 'ios' ? 40 : 20,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 80,
    justifyContent: 'space-between',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignSelf: 'center',
  },
  timeCount: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 250,
    left: 0,
    right: 0,
  },
});

export default VideoView;
