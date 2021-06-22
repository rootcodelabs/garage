import { StyleSheet, TouchableOpacity, View, 
  // Text,
  // Image
  Platform
 } from 'react-native';

import React, { useEffect } from 'react';
import { H3 } from '../header/H';

// import CallCutIcon from '../assets/callCutIcon.svg';


import VideoCallProfilePicture from '../video/VideoCallProfilePicture';

export type VideoStatusEnum = 'initial' | 'connecting' | 'connected' | 'disconnecting' | 'disconnected';

interface Props {
  videoStatus: VideoStatusEnum;
  onCutCallAfterConnect: () => void;
  currentCall: any;
  currentCallType: any;
  callCutIcon: any;
  soundPlayer: any;
  inCallManager: any;
}

const CallConnectDisconnect: React.FC<Props> = ({ videoStatus, onCutCallAfterConnect, currentCall, currentCallType, callCutIcon,
  soundPlayer,
  inCallManager
}) => {

  console.log('call cut icon ?  ', inCallManager);

  const stillConnecting = videoStatus === 'connecting' || videoStatus === 'connected';
  const isIncomming = currentCallType === 'incomming'
  let image = '';
  let name = '';

  useEffect(() => {
    if (currentCallType === 'outgoing') {
      // inCallManager.setSpeakerphoneOn(true);

      if (Platform.OS === 'ios') {
        inCallManager.setForceSpeakerphoneOn(true)
        inCallManager.setSpeakerphoneOn(true);
        soundPlayer.onFinishedLoading((success: boolean) => {
          console.log('finished loading', success);
        })

        soundPlayer.playSoundFile('connecting', 'mp3');
        soundPlayer.setSpeaker(true);
          const _onFinishedPlayingSubscription = soundPlayer.addEventListener('FinishedPlaying', async () => {
            soundPlayer.playSoundFile('connecting', 'mp3');
            soundPlayer.setSpeaker(true);
          });
          return () => {
            soundPlayer.stop();
            _onFinishedPlayingSubscription.remove();
          };

      } else {

        soundPlayer.playSoundFile('connecting', 'mp3');
          soundPlayer.setSpeaker(true);
          const _onFinishedPlayingSubscription = soundPlayer.addEventListener('FinishedPlaying', async () => {
            soundPlayer.playSoundFile('connecting', 'mp3');
            soundPlayer.setSpeaker(true);
          });
          return () => {
            soundPlayer.stop();
            _onFinishedPlayingSubscription.remove();
          };

      }
      

     
    } else {
      return;
    }
  
  });

 
  if (!currentCall) {
    return null;
  }
  if (isIncomming) {
    name = currentCall.booking.expert.name;
    image = currentCall.booking.expert.profilePic;
  } else {
    name = currentCall.booking.customer.name;
    image = currentCall.booking.customer.profilePic;
  }
  if (videoStatus === 'initial') {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <H3 textAlign="center">{stillConnecting && !isIncomming && `Calling to ${name}...`}</H3>
         
        <H3 textAlign="center">{videoStatus === 'connecting' && isIncomming && `Connecting with ${name} `}</H3>
        
        <H3 textAlign="center">{videoStatus === 'connected' && isIncomming && `Connecting with ${name}`}</H3>
        
        <H3 textAlign="center">{!stillConnecting && `Disconnecting with ${name}`}</H3>
        
        <VideoCallProfilePicture image={image} />
        
        {videoStatus === 'disconnecting' ? null : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                console.log('cut after connecting library only ? ');
                onCutCallAfterConnect();
              }}>
                {/* <Image source={require('../assets/icons/callCutIcon.svg')}></Image> */}
                 {/* <callCutIcon /> */}
                 {callCutIcon}
               {/* <Text>Cut</Text> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    height: 450,
  },
  callCut: { width: 50, height: 50, marginTop: 10 },
});
export default CallConnectDisconnect;
