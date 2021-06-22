// import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { PermissionsAndroid, Platform } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { check, PERMISSIONS, request, checkNotifications } from 'react-native-permissions';

// let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

export const getRadioPermissionStatus = async () => {
  let granted: string;
  if (Platform.OS === 'android') {
    granted = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return granted;
  }
  if (Platform.OS === 'ios') {
    granted = await check(PERMISSIONS.IOS.MICROPHONE);
    return granted;
  }
};

export const getCameraPermissionStatus = async () => {
  let status: string;
  if (Platform.OS === 'android') {
    status = await check(PERMISSIONS.ANDROID.CAMERA);
    return status;
  }
  if (Platform.OS === 'ios') {
    status = await check(PERMISSIONS.IOS.CAMERA);
    return status;
  }
};

export const getStoragePermissionStatus = async () => {
  let granted: string;
  if (Platform.OS === 'android') {
    granted = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    return granted;
  }
  if (Platform.OS === 'ios') {
    granted = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return granted;
  }
};

export const getNotificationPermissionStatus = async () => {
  let granted = await checkNotifications();
  return granted.status;
};

export const hasNotificationPermission = async (): Promise<boolean> => {
  let granted = await checkNotifications();
  return isAllowedByPlatformStatus(granted.status);
};

export const hasCameraPermission = async (): Promise<boolean> => {
  let status = await getCameraPermissionStatus();
  return isAllowedByPlatformStatus(status);
};

export const hasRadioPermission = async (): Promise<boolean> => {
  let status = await getRadioPermissionStatus();
  return isAllowedByPlatformStatus(status);
};

export const hasStoragePermission = async (): Promise<boolean> => {
  let status = await getStoragePermissionStatus();
  return isAllowedByPlatformStatus(status);
};

export const hasRadioAndCameraPermission = async (): Promise<boolean> => {
  const radioPermission = await getRadioPermissionStatus();
  const cameraPermission = await getCameraPermissionStatus();

  if (radioPermission === 'denied' && cameraPermission === 'denied') {
    return false;
  }
  if (radioPermission === 'denied') {
    return false;
  }
  if (cameraPermission === 'denied') {
    return false;
  }
  if (radioPermission === 'granted' && cameraPermission === 'blocked') {
    return false;
  }
  if (cameraPermission === 'granted' && radioPermission === 'blocked') {
    return false;
  }
  if (radioPermission === 'blocked') {
    return false;
  }
  if (cameraPermission === 'blocked') {
    return false;
  }
  if (radioPermission === 'blocked' && cameraPermission === 'blocked') {
    return false;
  }
  return true;
};

const isAllowedByPlatformStatus = (status?: string): boolean => {
  if (Platform.OS === 'ios') {
    if (status === 'denied' || status === 'blocked') {
      return false;
    }
  } else {
    if (status !== 'granted') {
      return false;
    }
  }
  return true;
};

//Request Microphone permission
// export const requestRadioPermission = async () => {
//   try {
//     if (Platform.OS === 'ios') {
//       AudioRecorder.requestAuthorization();
//       AudioRecorder.prepareRecordingAtPath(audioPath, {
//         SampleRate: 22050,
//         Channels: 1,
//         AudioQuality: 'Low',
//         AudioEncoding: 'aac',
//       });
//       return true;
//     }
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
//       title: 'Record Audio Permission',
//       message: 'Need record audio permission for the communicate',
//       buttonNeutral: 'Ask Me Later',
//       buttonNegative: 'Cancel',
//       buttonPositive: 'OK',
//     });
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the Record Audio');
//     } else {
//       console.log('Record Audio permission denied');
//     }
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   } catch (err) {
//     console.warn(err);
//     return false;
//   }
// };

//Request Camera permission
export const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(result => {
        console.log('GRANTED IOS CAMERA', result);
      });
    }

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Camera Permission',
      message: 'Needs access to your camera so you call video',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      RNCamera.Constants.CameraStatus.READY;
      console.log('Camera permission Ready');
    }
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
