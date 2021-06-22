import React, {useState, useRef, useEffect} from 'react';

import { View, Text, StyleSheet,  TouchableOpacity,
  DeviceEventEmitter, 
  NativeEventEmitter, NativeModules
} from 'react-native';

// import TwilioVideoTest from 'react-native-twilio-video-test';
// import {TrackIdentifier}  from 'react-native-twilio-video-webrtc';
import {  TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';

// import VideoTest from 'react-native-twilio-video-test';
// import VideoTest from 'react-native-video-call-v1'

import HeadphoneDetection from 'react-native-headphone-detection';

import InCallManager from 'react-native-incall-manager';

interface TrackIdentifier {
  participantSid: string;
  videoTrackSid: string;
}


// 
// const masterOut = NativeModules.InCallManager;
// const masterOutEmitter = new NativeEventEmitter(masterOut);
// 

function InitiatorScreen(props : any) {

  const twilioVideo = useRef<any>(null);
  
  const [isAudioEnabled, setIsAudioEnable] = useState(true);
  const [status, setStatus] = useState("disconnected");

  // headphone
  const [isHeadphoneConnected, setIsHeadphoneConnected] = useState(false);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);

  const [isMobileSpeakerOn, setIsmMobileSpeakerOn] = useState(false);

  const [twillioTrack, setTwillioTrack] = useState<TrackIdentifier>({
    "participantSid" : "",
    "videoTrackSid": ""
  });

  useEffect(() => {

    // PERMISSIONS
    console.log('in call manager--', InCallManager);
    if (InCallManager.recordPermission !== 'granted') {
      InCallManager.requestRecordPermission();
    }

    // this is for initial load
    HeadphoneDetection.isAudioDeviceConnected()
    .then(status =>  {
        console.log('headphone--', status);
        if (status.audioJack) {
          setIsHeadphoneConnected(true);
        } else {
          setIsHeadphoneConnected(false);
        }

        if (status.bluetooth) {
          setIsBluetoothConnected(true);
        } else {
          setIsBluetoothConnected(false);
        }
    });
    
    HeadphoneDetection.addListener((data) => {
      console.log('connected----', data);
      if (data.audioJack) {
        setIsHeadphoneConnected(true);
      } else {
        setIsHeadphoneConnected(false);
      }

      if (data.bluetooth) {
        setIsBluetoothConnected(true);
      } else {
        setIsBluetoothConnected(false);
      }

    });

    twilioVideo.current.connect({
      roomName: props.route.params.name,
      accessToken: props.route.params.token,
    });
    setStatus("connecting")
  
    return () => {
      _onEndButtonPress();
    };
  }, []);

  useEffect(() => {
    console.log('status from client--', status, isHeadphoneConnected, isBluetoothConnected);
    if (status && status === 'connected') {

      if (isHeadphoneConnected) {
        InCallManager.setSpeakerphoneOn(false);
      } else if (isBluetoothConnected) {
        twilioVideo.current.setBluetoothHeadsetConnected(true);
        InCallManager.chooseAudioRoute("BLUETOOTH");
      } else if (isBluetoothConnected && isHeadphoneConnected) {
        InCallManager.setSpeakerphoneOn(false);
      } else {
        InCallManager.setSpeakerphoneOn(true);

        //
        setIsmMobileSpeakerOn(true);
      }

      // if (isBluetoothConnected) {
      //   console.log('comes-to-bluetooth---', isBluetoothConnected);
      //   // InCallManager.chooseAudioRoute('BLUETOOTH');
      //   twilioVideo.current.setBluetoothHeadsetConnected(true);
      //   InCallManager.chooseAudioRoute("BLUETOOTH");
      // } else {
      //   console.log('comes-here-connection--');
      //   if (isHeadphoneConnected) {
      //     InCallManager.setSpeakerphoneOn(false);
      //   } else {
      //     InCallManager.setSpeakerphoneOn(true);
      //   }
      // }
     
     
    }
  }, [status, isHeadphoneConnected, isBluetoothConnected])

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
    setStatus("disconnected");
    props.navigation.goBack();
  };

  const _onMuteButtonPress = async () => {
    const enable = await twilioVideo.current.setLocalAudioEnabled(!isAudioEnabled);
    setIsAudioEnable(enable);
  };

  const onCameraSwitch = () => {
    twilioVideo.current.flipCamera();
  };

  // this method toggles sound back to 
  const onSoundToggle = () => {
    console.log('is it on ? ', isMobileSpeakerOn);

    if (isMobileSpeakerOn) {
        // write logic to connect to bluetoot or headphone if available when 
        // switching from speaker phone to normal
    }

    const test = !isMobileSpeakerOn;
    setIsmMobileSpeakerOn(test);
    twilioVideo.current.toggleSoundSetup(test);
    // console.log('ref-option--', twilioVideo.current);
  }

  return (
    <View style={styles.callContainer} >
    
    <TwilioVideoLocalView
         enabled={true}
         scaleType={"fit"}         
         style={styles.localVideo}
       />

      {(status === 'connected' || status === 'connecting') && (
        <View style={styles.container}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              {twillioTrack && 
                <TwilioVideoParticipantView
                  style={styles.remoteVideo}
                  key={twillioTrack.videoTrackSid}
                  trackIdentifier={twillioTrack}
                />
              }            
            </View>
          )}  
             <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton}  onPress={_onEndButtonPress}>
                <Text style={{fontSize: 12}}> End</Text>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.optionButton} onPress={onCameraSwitch}>
                <Text style={{fontSize: 12}}> Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={_onMuteButtonPress}>
                  <Text style={{fontSize: 12}}>
                      {props.isAudioEnabled ? 'Mute' : 'Unmute'}
                  </Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.optionButton} onPress={onSoundToggle}>
                <Text style={{fontSize: 12}}> Toggle</Text>
             </TouchableOpacity>
            </View>
                            
        </View>
      )}

      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={() => {
          // props.setStatus('connected');
          setStatus('connected')
        }}
        onRoomDidDisconnect={() => {
          setStatus('disconnected');
        }}
        onRoomDidFailToConnect={(error) => {
          return error;
        }}
        onParticipantAddedVideoTrack={({participant, track}) => {
          if (track.enabled) {
            setTwillioTrack({
              videoTrackSid: track.trackSid,
              participantSid: participant.sid,
            });
       
          }
        }}
        onParticipantRemovedVideoTrack={() => {
          const obj = {
            "participantSid" : "",
            "videoTrackSid": ""
          }
          setTwillioTrack(obj);

        }}
      />


      {/* <View style={styles.remoteGrid}>
        {console.log('twillio-yeah---', twillioTrack)}
        <Text></Text>
      </View> */}

      {/* <View> */}
        {/* <VideoTest 
          roomName={props.route.params.name} 
          accessToken={props.route.params.token}
          setStatus={setStatus}
          status={status}
          videoRef={twilioVideo}
          twillioTrack={twillioTrack}
          setTwillioTrack={setTwillioTrack}
          onEndButtonPress={_onEndButtonPress}
          onMuteButtonPress={_onMuteButtonPress}
          isAudioEnabled={isAudioEnabled}
          onCameraSwitch={onCameraSwitch}
          onSoundToggle={onSoundToggle}
        >

        </VideoTest> */}
      {/* </View> */}


    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
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
      height: 240,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'absolute',
      zIndex: 1000,
      right: 16,
      top: 0
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
    optionsContainerDup: {
      position: 'absolute',
      left: 0,
      // bottom: 0,
      top:0,
      flex:1,
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
    optionButtonDup: {
      width: 100,
      height: 100,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 40,
      borderRadius: 100 / 2,
      backgroundColor: 'yellow',
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
    }
  
 


  });
  

export default InitiatorScreen;