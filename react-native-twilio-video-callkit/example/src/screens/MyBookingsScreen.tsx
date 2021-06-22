import React, {useState,  useEffect} from 'react';
import { PERMISSIONS, checkMultiple, requestMultiple, request } from 'react-native-permissions';
import { View, Text,  Button, StyleSheet, PermissionsAndroid, TouchableOpacity,
  FlatList, SafeAreaView, StatusBar, Alert, Platform, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../redux/rootReducer';
import {
  clearBookingMessages,
  clearCustomerUpcomingBookings,
  clearExpertUpcomingBookings,
  getCustomerUpcomingBookings,
  getExpertUpcomingBookings,
} from '../redux/rootActions';

import { useDispatch, useSelector } from 'react-redux';
// import { loginLocal, getCustomerUpcomingBookings, getLatestCallStatus } from '../services';


  
function BookingsScreen(props: any) {

  const dispatch = useDispatch();

  const expertUpcomingBookings = useSelector((state: RootState) => state.booking.customerUpcomingBookings);

  const [bookings, setBookings] = useState<any>([]);
  const [clickedBooking, setClickedBooking] = useState(null);

  // useEffect(() => {
  //   async function loadInitialData () {
  //     const loginResponse = await loginLocal("layan@yahoo.com", "corona");
  //     console.log('login-resp', loginResponse);

  //     await AsyncStorage.setItem('expertAccessToken', loginResponse.expertAccessToken);
      
  //     await AsyncStorage.setItem('customerAccessToken', loginResponse.customerAccessToken);

  //     const expertUpcomingBookings = await getCustomerUpcomingBookings(loginResponse.expertAccessToken);
  //     {console.log('bookings', expertUpcomingBookings.bookings)}
  //     setBookings(expertUpcomingBookings.bookings);
  //   }
  //   loadInitialData();
    
  // }, [])

  useEffect(() => {
    dispatch(getCustomerUpcomingBookings(0));
  }, [dispatch])

  const onListItemClicked = (item: any) => {
      setClickedBooking(item.bookingId);

      props.navigation.navigate('Selected Booking', { bookingId: item.bookingId });
  }
 

  return (
    <SafeAreaView style={styles.container}>
 
      {/* <ScrollView> */}

        <FlatList
          data={expertUpcomingBookings}
          renderItem={({ item }) =>
              <TouchableOpacity onPress={() => onListItemClicked(item)} style={[styles.item]}>
                <Text style={[styles.title]}>{item.customer.name}</Text>
              </TouchableOpacity> 
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

      {/* </ScrollView> */}
 
    </SafeAreaView>
  
  );
}

const styles = StyleSheet.create({
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