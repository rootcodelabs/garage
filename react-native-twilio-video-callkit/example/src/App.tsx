import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { Provider } from 'react-redux';
import RNCallKeep from 'react-native-callkeep';
import rootReducer from './redux/rootReducer';
import LoginScreen from './screens/LoginScreen';
import BookingsScreen from './screens/BookingsScreen';
import MyBookingScreen from './screens/MyBookingsScreen';
import HomeScreen from './screens/HomeScreen';
import InitiatorScreen from './screens/InitiatorScreen';

import CallScreenHandler from './handlers/CallScreenHandler';
import NotificationHandler from './handlers/NotificationHandler';

import { STRIPE_KEY, callKitEnabled, isProd } from './constance';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getLatestCallStatus } from './redux/callLogs/actions';
import thunk from 'redux-thunk';
const BookingStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function BookingsStackNavigator() {
  return (
    <BookingStack.Navigator initialRouteName="Bookings">
      <BookingStack.Screen name="Bookings" component={BookingsScreen} options={{ headerShown: true }} />
      <BookingStack.Screen name="Selected Booking" component={HomeScreen} options={{ headerShown: true }} />
      <BookingStack.Screen name="Video Call Screen" component={InitiatorScreen} options={{ headerShown: true }} />
    </BookingStack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bookings" component={BookingsStackNavigator} />
      <Tab.Screen name="My Bookings" component={MyBookingScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

      <Tab.Screen name="Logout" component={LogoutScreen} />
      
      {/* <Tab.Screen name="Initiator" component={InitiatorScreen} /> */}
    </Tab.Navigator>
  );
}

function LogoutScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
        <Text>Logout </Text>
      </TouchableOpacity>     
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

export const store = createStore(rootReducer, applyMiddleware(thunk));

export function initializationOnLoad () {
  store.dispatch(getLatestCallStatus('customerAccessToken'));
}

// call kit
function setupCallKeep() {
  const options = {
    ios: {
      appName: 'Expert Republic',
    },
    android: {
      alertTitle: 'Permissions Required',
      alertDescription: 'This application needs to access your phone calling accounts to make calls',
      cancelButton: 'Cancel',
      okButton: 'ok',
      imageName: 'ic_launcher',
      additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
    },
  };

  try {
    RNCallKeep.setup(options);
  } catch (err) {
    console.error('initializeCallKeep error:', err.message);
  }
}

if (Platform.OS === 'android' && callKitEnabled) {
  setupCallKeep();
}

export function handleRemoteMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  store.dispatch(getLatestCallStatus('customerAccessToken'));
  
  if (remoteMessage.data) {
    RNCallKeep.displayIncomingCall(remoteMessage.data.callLogId, remoteMessage.data.name, undefined, 'generic', true);
    RNCallKeep.addEventListener('answerCall', () => {
      RNCallKeep.backToForeground();
      RNCallKeep.endAllCalls();
      RNCallKeep.removeEventListener('endCall');
    });
    RNCallKeep.addEventListener('endCall', ({ callUUID: uuid }) => {
      // store.dispatch(updateCallStatus('CALL_REJECTED'));
      RNCallKeep.rejectCall(uuid);
      // handleCallDecline();
    });
  }
}

const Stack = createStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
        // initialRouteName="Bookings"
        initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          
          <Stack.Screen name="Initial" component={HomeScreen} />
          <Stack.Screen name="Video" component={InitiatorScreen} />

          <Stack.Screen name="Bookings" component={MyTabs} options={{ headerShown: false }}  />
        </Stack.Navigator>
        <CallScreenHandler></CallScreenHandler>
        <NotificationHandler></NotificationHandler>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
