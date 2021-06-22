import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


import React from 'react';

// import CallEndIcon from 'react-native-vector-icons/MaterialIcons';


interface Props {
  name: string;
  image: string;
  onCutCall: () => void;
  callCutIcon: any;
}

const InitialCallingView: React.FC<Props> = ({ name, onCutCall, callCutIcon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text> Calling to {name} </Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onCutCall()}>
            {/* <Text>Cut call</Text> */}
            {callCutIcon}
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
