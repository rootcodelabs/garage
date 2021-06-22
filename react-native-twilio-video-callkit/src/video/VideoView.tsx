import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';

import React from 'react';

export interface TwillioVideoTrackInterface {
  participantSid: string;
  videoTrackSid: string;
}
interface Props {
  status: string | null;
  isAudioEnabled: boolean;
  track: TwillioVideoTrackInterface | null;
  onCutCall: () => void;
  onMicSwitch: () => void;
  onCameraSwitch: () => void;
  callCutIcon: any;
  cameraToggleIcon: any;
  muteIcon: any;
  muteRedIcon: any;
}

const VideoView: React.FC<Props> = ({
  status,
  track,
  onCutCall,
  isAudioEnabled,
  onMicSwitch,
  onCameraSwitch,
  callCutIcon,
  cameraToggleIcon,
  muteIcon,
  muteRedIcon
}) => {

  console.info('is connected from library ? ', status);
  console.info('is there a track from library ? ', track);

  const isConnected = status === 'connected';
  if (!isConnected) {
    return null;
  }
  return (
    <View 
      style={styles.callContainer}
    >
      <TwilioVideoLocalView enabled={true} style={!track ? styles.remoteVideo : styles.localVideo} />
      <View >
        {track && (
          <TwilioVideoParticipantView
            style={track ? styles.remoteVideo : styles.localVideo}
            key={track.videoTrackSid}
            trackIdentifier={track}
          />
        )}
      </View>

      

      <TouchableOpacity style={styles.cutButton} onPress={() => onCutCall()}>
        {callCutIcon}
        {/* <Text>Cut</Text> */}
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => onCameraSwitch()}>
          {/* <SwitchCameraIcon /> */}
          {/* <Text>Camera toggle</Text> */}
          {cameraToggleIcon}
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => onMicSwitch()}>
          {isAudioEnabled ? muteIcon :  muteRedIcon}
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
