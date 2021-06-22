import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import compareVersions from 'compare-versions';

const config = require('../../app.json');

export function getUniqueDeviceId() {
  return DeviceInfo.getUniqueId();
}
export function getDeviceInfo() {
  return `${DeviceInfo.getModel()} ${getAppVersion()}`;
}

export function getAppVersion() {
  const codePushVersion = Platform.OS === 'ios' ? config.codePushIos : config.codePushAndroid;
  return ` v ${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()} (${codePushVersion})`;
}

export function isThisOlderVersion(minVersionIOS: string, minVersionAndroid: string) {
  const minVersion = Platform.OS === 'ios' ? minVersionIOS : minVersionAndroid;
  const isValid = compareVersions.validate(minVersion);
  if (isValid) {
    const appVersion = DeviceInfo.getVersion();
    const result = compareVersions.compare(appVersion, minVersion, '<');
    return result;
  }
  return false;
}

export function isLatestAppVersion(latestVersionIOS: string, latestVersionAndroid: string): boolean {
  const latestVersion = Platform.OS === 'ios' ? latestVersionIOS : latestVersionAndroid;
  const isValid = compareVersions.validate(latestVersion);
  if (isValid) {
    const appVersion = DeviceInfo.getVersion();
    const result = compareVersions.compare(appVersion, latestVersion, '<');
    return !result;
  }
  return false;
}
