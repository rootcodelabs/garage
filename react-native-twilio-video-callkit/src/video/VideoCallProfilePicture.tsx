import { Image, StyleSheet, View } from 'react-native';

// import CallingCircleIcon from '../../assets/icons/c';
import { PLACEHOLDER_USER_IMAGE } from '../constants';
import React from 'react';
import { getImageUrl } from '../utils';

interface Props {
  image: string;
}

const VideoCallProfilePicture: React.FC<Props> = ({ image }) => {
  const imageUrl = getImageUrl(image, PLACEHOLDER_USER_IMAGE);
  return (
    <View style={styles.container}>
      <View style={styles.callCircle}>
        <Image style={styles.userProfile} source={{ uri: imageUrl }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  callCircle: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  userProfile: { position: 'absolute', height: 170, width: 170, borderRadius: 85 },
  userProfileWave: { height: 200, width: 200 },
});

export default VideoCallProfilePicture;
