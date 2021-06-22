import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import CallCutIcon from '../../assets/icons/callCutIcon.svg';
// import { H3 } from '../../components/H';
import React, { useEffect } from 'react';
import { H3 } from '../../components/header/H';
import CallEndIcon from 'react-native-vector-icons/MaterialIcons';

import { RootState } from '../../redux/rootReducer';
// import Timer from '../../components/videoCall/Timer';
import VideoCallProfilePicture from './VideoCallProfilePicture';
import { VideoStatusEnum } from './CallScreen';
import { useSelector } from 'react-redux';
// import InCallManager from 'react-native-incall-manager';
// import SoundPlayer from 'react-native-sound-player';

interface Props {
  videoStatus: VideoStatusEnum;
  onCutCallAfterConnect: () => void;
  onTimeExceeded: () => void;
}

const CallConnectDisconnect: React.FC<Props> = ({ videoStatus, onCutCallAfterConnect, onTimeExceeded }) => {
  const currentCall = useSelector((state: RootState) => state.app.currentCall);
  const currentCallType = useSelector((state: RootState) => state.app.currentCallType);

  const stillConnecting = videoStatus === 'connecting' || videoStatus === 'connected';
  const isIncomming = currentCallType === 'incomming';
  let image = '';
  let name = '';

 
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
        {/* <Text>{stillConnecting && !isIncomming && `Calling to ${name}...`}</Text> */}
        
        <H3 textAlign="center">{videoStatus === 'connecting' && isIncomming && `Connecting with ${name} `}</H3>
        {/* <Text>{videoStatus === 'connecting' && isIncomming && `Connecting with ${name} `}</Text> */}

        <H3 textAlign="center">{videoStatus === 'connected' && isIncomming && `Connecting with ${name}`}</H3>
        {/* <Text>{videoStatus === 'connected' && isIncomming && `Connecting with ${name}`}</Text> */}

        <H3 textAlign="center">{!stillConnecting && `Disconnecting with ${name}`}</H3>
        {/* <Text>{!stillConnecting && `Disconnecting with ${name}`}</Text> */}
    
        <VideoCallProfilePicture image={image} />
     
        {videoStatus === 'disconnecting' ? null : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                onCutCallAfterConnect();
              }}>
                 <CallCutIcon style={styles.callCut} />
                {/* <CallEndIcon name="call-end" size={50} color="#bf1313" />  */}
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
