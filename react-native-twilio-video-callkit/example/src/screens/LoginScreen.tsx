import { CommonActions, useNavigation } from '@react-navigation/native';
import React, {useState,  useEffect} from 'react';
import { PERMISSIONS, checkMultiple, requestMultiple, request } from 'react-native-permissions';
import { View, Text,  Button, StyleSheet, PermissionsAndroid, TouchableOpacity,
  FlatList, SafeAreaView, StatusBar, Alert, Platform, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cleanAuthError, loginLocal, getProfile, getLatestCallStatus, registerTokenForPushNotification, postDeviceReadyForNewCall  } from '../redux/rootActions';
import { useDispatch, useSelector } from 'react-redux';
import { hasLoggedIn, initChatConnectivity, logger, moveAuthCredsToReduxIfAvailable } from '../utils';
// import { loginLocal, getCustomerUpcomingBookings, getLatestCallStatus } from '../services';
import { RootState } from '../redux/rootReducer';

  
function BookingsScreen(props: any) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOwner = useSelector((state: RootState) => state.profile.isOwner);
  const isExpert = useSelector((state: RootState) => state.profile.isExpert);
  const loginSuccess = useSelector((state: RootState) => state.auth.loginSuccess);
  const ownerProfile = useSelector((state: RootState) => state.owner.ownerProfile);
  const loginErrorMessage = useSelector((state: RootState) => state.auth.loginErrorMessage);
  const shouldRedirectToVerify = useSelector((state: RootState) => state.auth.shouldRedirectToVerify);


  useEffect(() => {
    async function test() {
      const loggedIn = await hasLoggedIn();

      console.log('logged in ? ', loggedIn);
      if (loggedIn) {
        await dispatch(getProfile(true));
        dispatch(registerTokenForPushNotification());
        dispatch(postDeviceReadyForNewCall());
        dispatch(getLatestCallStatus('customerAccessToken'));

        const navigateTo = CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Bookings",
            },
          ],
        });
        navigation.dispatch(navigateTo);
      }
    }
  test();
  }, [dispatch])

  useEffect(() => {
    if (shouldRedirectToVerify) {
      console.log('email verification required ?-', shouldRedirectToVerify)
      // navigation.navigate('VerifyEmailScreen', { email: userEmail, isInitial: false });
    } else if (loginSuccess) {
      console.log('login success ? ', loginSuccess);
      dispatch(cleanAuthError());

       dispatch(getProfile(true));
      dispatch(registerTokenForPushNotification());
      dispatch(postDeviceReadyForNewCall());
      dispatch(getLatestCallStatus('customerAccessToken'));

      const navigateTo = CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Bookings",
          },
        ],
      });
      navigation.dispatch(navigateTo);
      
      if (isOwner && ownerProfile && (!ownerProfile.businessLogo || !ownerProfile.about)) {
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{ name: 'HomeApp' }],
        //   }),
        // );
        // setTimeout(() => {
        //   navigation.navigate('MyBusinessProfile', {});
        // }, 100);
      } else {
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{ name: 'HomeApp' }],
        //   }),
        // );
      }
    }
  }, [loginSuccess, dispatch, navigation, isExpert, isOwner, ownerProfile, shouldRedirectToVerify]);


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        // keyboardType="numeric"
      />

      <TouchableOpacity style={styles.optionButton} 
          onPress={async() => 
            await dispatch(loginLocal(email, password))
          }>
          <Text>Login</Text>
      </TouchableOpacity>
  </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
    separator: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "pink",
    },
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
  

export default BookingsScreen;