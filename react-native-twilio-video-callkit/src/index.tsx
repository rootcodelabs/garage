
import React, { useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import VideoView from './video/VideoView';

import CallConnecting from './video/CallConnecting';
import InitialCallingView from './video/InitialCallingView';

import { TwilioVideo } from 'react-native-twilio-video-webrtc';

function VideoComponent (props: any) {
 
  // console.log('children props ? ', props.children)
  useEffect(() => {
    // console.log('current status', props.videoStatus);
  }, [props.videoStatus])

  useEffect(() => {
    console.log('status from client--', props.videoStatus, props.isHeadphoneConnected, props.isBluetoothConnected, Platform.OS);
    if (Platform.OS !== 'ios') {
      if (props.videoStatus && props.videoStatus === 'connected') {

        if (props.isHeadphoneConnected) {
          props.inCallManager.setSpeakerphoneOn(false);
        } else if (props.isBluetoothConnected) {
         
          // if (Platform.OS !== 'ios') {
            props.twilioVideoRef.current.setBluetoothHeadsetConnected(true);
            props.inCallManager.chooseAudioRoute("BLUETOOTH");
          // } else {
            // props.inCallManager.setSpeakerphoneOn(true);
          // }
          
        } else if (props.isBluetoothConnected && props.isHeadphoneConnected) {
          props.inCallManager.setSpeakerphoneOn(false);
        } else {
          props.inCallManager.setSpeakerphoneOn(true);
  
          // setIsmMobileSpeakerOn(true);
        }
      }
    } else {  // remove if android messes it up
      props.inCallManager.setForceSpeakerphoneOn(true);
      props.inCallManager.setSpeakerphoneOn(true);
    }
  }, [props.videoStatus, props.isHeadphoneConnected, props.isBluetoothConnected, props.twilioVideoRef.current, Platform.OS])

  useEffect(() => {
    console.info('twilio track ? ', props.twillioTrack, Platform.OS)

    // if (Platform.OS === 'ios' && props.currentCallType === 'outgoing') {
    //   console.log('its an ios ? ')
    //   if (props.twillioTrack) {
    //     props.inCallManager.setForceSpeakerphoneOn(true);
    //     props.inCallManager.setSpeakerphoneOn(true)
    //   }
    // }
  }, [props.twillioTrack, Platform.OS, props.currentCallType])

  return (
    <View style={styles.container}>
      {props.videoStatus === 'initial' && (
        <InitialCallingView 
          currentCall={props.currentCall}
          currentCallType={props.currentCallType}
          dispatchOnCutCall={() => {
            console.info('cut call index library ?')
            props.dipatchOnCutCall
          }} 
          dispatchOnCallIgnore={() => {
            console.log('call ignore libraru ? index')
            props.dispatchOnCallIgnore()
          }}  
          dispatchOnCallAnswer={() => {
            props.dispatchOnCallAnswer()
          }}   
          callCutIcon={props.children[0]}
          callAnswerIcon={props.children[1]}
          soundPlayer={props.soundPlayer}
          appState={props.appState}
        />
      )}

    {!props.twillioTrack && (
      <CallConnecting
        currentCall={props.currentCall}
        currentCallType={props.currentCallType}     
        videoStatus={props.videoStatus}
        onCutCallAfterConnect={() => {
          console.log('cut after connected ? index');
          props.onCutCallAfterConnect()
        }}
        callCutIcon={props.children[0]}
        soundPlayer={props.soundPlayer}
        inCallManager={props.inCallManager}
      >
        {/* {props.children} */}
        </CallConnecting>
    )}

   
    {props.twillioTrack && (
      <VideoView
        status={props.videoStatus}
        track={props.twillioTrack}
        isAudioEnabled={props.isAudioEnabled}
        onCutCall={() => {
          console.log('cut call after answering ?  !!  ')
          props.handleCallDecline();
          props.onCutCallAfterConnect();
        }}
        onMicSwitch={() => {
          console.log('mic switch ? ')
          props.onMicSwitch();
        }}
        onCameraSwitch={() => {
          console.log('camera switch ?')
          props.onCameraSwitch();
        }}
        callCutIcon={props.children[0]}
        cameraToggleIcon={props.children[2]}
        muteIcon={props.children[3]}
        muteRedIcon={props.children[4]}
      />
    )}

    <TwilioVideo
      ref={props.twilioVideoRef}
      onRoomDidConnect={() => props.setVideoStatus('connected')}
      onRoomDidDisconnect={() => props.setVideoStatus('disconnected')}
      onRoomDidFailToConnect={() => {
        console.log('failed to connect from library ? ')
        // dispatch(updateCallStatus('ENDED_BY_APP'));
      }}
      onParticipantAddedVideoTrack={(response: any) => {
        props.setVideoStatus('connected');
        const { participant, track } = response;
        console.log('participants from library ? ', participant, track);
        props.setTwillioTrack({
          videoTrackSid: track.trackSid,
          participantSid: participant.sid,
        });
      }}
      onParticipantRemovedVideoTrack={() => {
        props.setTwillioTrack(null);
      }}
    />
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
  // width: '100%',
  // height: '100%'
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
  }


});


export default VideoComponent;