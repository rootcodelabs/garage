import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { getDeviceId } from 'react-native-device-info';

// const API_URL = "https://stage-api.serw.io/v1";
const API_URL = "https://api.serw.io/v1";

export const getTwillioVideoToken = async()  => {
    try {
      const currentUserId = "8900528124";
      
      const response = await axios.get(`https://stage-api.serw.io/v1/video/token?identity=${currentUserId}`);
      const { token, expireIn } = response.data;
    
      const obj = {
        token : token,
        expireIn : expireIn
      }

      // console.log("aaa", response.data);
      return obj;
    } catch (error) {
      console.log('getTwillioVideoToken error', error);
      return null;
    }
};
  

  export const loginLocal = async (email: any, password: any)  => {
    try {
     
      const response = await axios.post(`${API_URL}/auth/local/login`, {
        email: email.trim(),
        password,
      });
      // console.log("RESP---", response.data);

      return response.data;
  
     
    } catch (error) {
      console.log("ERROR LOGGING IN--", error)
      return null;
    }
  };

  export const getCustomerUpcomingBookings = async(customerAccessToken: any) => {
    // console.log("token customer-", customerAccessToken)
    let fields =
      'bookings[].bookingId,bookings[].status,bookings[].currency,bookings[].durationMinutes,bookings[].price,bookings[].notes,bookings[].completedDate,bookings[].expertUserId,bookings[].paymentType,bookings[].paymentRef,bookings[].creditsSpent,bookings[].createdDate,bookings[].expert,bookings[].scheduledTime,bookings[].service,bookings[].customer,bookings[].rating,bookings[].successfulCalls';
    try {
   
      const config = await axiosConfig(customerAccessToken); 
      const response = await axios.get(
        `${API_URL}/bookings?status=ACCEPTED&fields=${fields}&skip=${0}&take=10`,
        config,
      );

      // console.log("book---", response.data)
      return response.data;
  
     
    } catch (error) {
      console.log("booking error--", error)
     return error;
    }
  };


  export function getAppVersion() {
    return ` v ${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()} 149`;
  }

  export const startCallLog = async (bookingId : any, expertAccessToken : any) => {
    try {
      
      console.log("booking--", bookingId, expertAccessToken);
      
      const config = await axiosConfig(expertAccessToken);
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/call-logs`,
        {
          deviceId: getDeviceId(),
          appVersion: `${DeviceInfo.getModel()} ${getAppVersion()}`,
        },
        config,
      );
      return response.data;

    } catch (error) {
     return error;
    }
  };

  export async function axiosConfig(token: any) {
  
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  export const latestCallStatus = () => {
    return "yeahhhhhhhhhhhhhhhhhh";
  }

  export const getLatestCallStatus = async (customerAccessToken: any) => {
    try {
     
      const config = await axiosConfig(customerAccessToken);
      const response = await axios.get(`${API_URL}/call-logs/latest`, config);
  
      const lastCallLog = response.data;
  
      console.log('latest call log', lastCallLog);
      if (lastCallLog) {
        if (lastCallLog.status === 'CALLING') {
          // dispatch(setCurrentCallStatus(lastCallLog, 'incomming'));
        }
      } else {
        // dispatch(setCurrentCallStatus(null, null));
      }
      return response.data;
      
    } catch (error) {
      return error;
      // dispatch({ type: GET_LATEST_CALL_STATUS_FAILED, payload: getErrorMessage(error) });
    }
  };