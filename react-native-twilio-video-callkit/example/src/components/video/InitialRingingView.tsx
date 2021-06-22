import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import CallCutIcon from '../../assets/icons/callCutIcon.svg';
import { H3 } from '../../components/header/H';
import React from 'react';
import VideoCallProfilePicture from './VideoCallProfilePicture';

// import CallEndIcon from 'react-native-vector-icons/MaterialIcons';


interface Props {
  name: string;
  image: string;
  onCutCall: () => void;
}

const InitialCallingView: React.FC<Props> = ({ name, image, onCutCall }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <H3 textAlign="center">{`Calling -  ${name}...`}</H3>
        {/* <Text> Calling to {name} </Text> */}

        <VideoCallProfilePicture image={image} />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onCutCall()}>
            <CallCutIcon style={{ width: 50, height: 50, marginTop: 10 }} />
            {/* <CallEndIcon name="call-end" size={50} color="#bf1313" /> */}
            {/* <Text>Cut call</Text> */}
          </TouchableOpacity>
        </View>
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
});
export default InitialCallingView;
