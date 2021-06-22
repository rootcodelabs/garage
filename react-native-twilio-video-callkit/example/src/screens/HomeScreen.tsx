import React, {useState,  useEffect} from 'react';
import { PERMISSIONS, checkMultiple, requestMultiple, request } from 'react-native-permissions';
import { View, Text,  Button, StyleSheet, PermissionsAndroid, Alert, Platform, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';
import { getTwillioVideoToken } from '../redux/app/actions';
import { startCallLog } from '../redux/rootActions';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginLocal, getTwillioVideoToken, getCustomerUpcomingBookings, startCallLog } from '../services';

  
function HomeScreen(props: any) {
 
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('');
  const [callLogId, setCallLogId] = useState("");

  const [bookingId, setBookingId] = useState("");
  const [expertAccessToken, setExpertAccessToken] = useState("");

  const currentCall = useSelector((state: RootState) => state.app.currentCall);
 
  const _checkPermissions = (callback: any) => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    checkMultiple(
      Platform.OS === 'ios' ? iosPermissions : androidPermissions,
    ).then((statuses) => {
      console.log("statuses---", statuses);
      const [CAMERA, AUDIO] =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (statuses[CAMERA] === PermissionsAndroid.RESULTS.UNAVAILABLE ||
        statuses[AUDIO] === PermissionsAndroid.RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      } else if (
        statuses[CAMERA] === PermissionsAndroid.RESULTS.BLOCKED ||
        statuses[AUDIO] === PermissionsAndroid.RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Error',
          'Permission to access hardware was blocked, please grant manually',
        );
      } else {
        if (
          statuses[CAMERA] === PermissionsAndroid.RESULTS.DENIED &&
          statuses[AUDIO] === PermissionsAndroid.RESULTS.DENIED
        ) {
          requestMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
          ).then((newStatuses) => {
            if (
              newStatuses[CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
              newStatuses[AUDIO] === PermissionsAndroid.RESULTS.GRANTED
            ) {
              callback && callback();
            } else {
              Alert.alert('Error', 'One of the permissions was not granted');
            }
          });
        } else if (
          statuses[CAMERA] === PermissionsAndroid.RESULTS.DENIED ||
          statuses[AUDIO] === PermissionsAndroid.RESULTS.DENIED
        ) {
          request(statuses[CAMERA] === PermissionsAndroid.RESULTS.DENIED ? CAMERA : AUDIO).then(
            (result) => {
              if (result === PermissionsAndroid.RESULTS.GRANTED) {
                callback && callback();
              } else {
                Alert.alert('Error', 'Permission not granted');
              }
            },
          );
        } else if (
          statuses[CAMERA] === PermissionsAndroid.RESULTS.GRANTED ||
          statuses[AUDIO] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          callback && callback();
        }
      }
    });
  };

  useEffect(() => {
    _checkPermissions(async function() {
      console.log("permission-callback-")
    });

  }, [])

 

  return (
    <View style={styles.container}>
    
        <View>
          <Text>
            React Native Twilio Video
          </Text>
          <TextInput
            placeholder={"room name"}
            autoCapitalize='none'
            value={roomName}
            onChangeText={(text) => setRoomName(text)}>
          </TextInput>

          <TextInput
            placeholder={"token"}
            autoCapitalize='none'
            value={token}
            // onChangeText={(text) => setToken(text)}
            >
          </TextInput>
          <Button
            title="Connect"
            onPress={async () => {
              const token = await dispatch(getTwillioVideoToken());
          
              if (token) {
                await dispatch(startCallLog(props.route.params.bookingId));        
                
              } else {
                  // logger.error('onCallAnswer: token not found');
              }
             
            }}>
          </Button>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
    callContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
  

export default HomeScreen;