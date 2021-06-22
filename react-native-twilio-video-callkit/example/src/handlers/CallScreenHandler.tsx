import { Modal, StyleSheet, View } from 'react-native';

// import CallScreen from '../components/booking/InitialAnsweringView';
import CallScreen from '../components/video/CallScreen';
import React, {useEffect} from 'react';

import InCallManager from 'react-native-incall-manager';
import HeadphoneDetection from 'react-native-headphone-detection';
// import { RootState } from '../redux/rootReducer';
// import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getLatestCallStatus } from '../services';
import { useState } from 'react';

import { RootState } from '../redux/rootReducer';
import { useSelector, useDispatch } from 'react-redux';

interface Props {}

const CallScreenHandler: React.FC<Props> = () => {
  
  const dispatch = useDispatch();

  const currentCall = useSelector((state: RootState) => state.app.currentCall);

  // bluetooth temp
  const [isHeadphoneConnected, setIsHeadphoneConnected] = useState(false);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  
  const [isMobileSpeakerOn, setIsmMobileSpeakerOn] = useState(false);

  useEffect(() => {

    if (InCallManager.recordPermission !== 'granted') {
      InCallManager.requestRecordPermission();
    }

    HeadphoneDetection.isAudioDeviceConnected()
    .then(status =>  {
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

  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!currentCall}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <CallScreen 
          isHeadphoneConnected={isHeadphoneConnected}
          isBluetoothConnected={isBluetoothConnected}>
        </CallScreen>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CallScreenHandler;
