import { API_URL } from '../../constance';

import axios from 'axios';
import { axiosConfig, getErrorMessage, isAuthenticated } from '../../utils';

const PREFIX = '@CURRENCIES';

export const CLEAR_CURRENCIES = PREFIX + 'CLEAR_CURRENCIES';

export const GET_EXCHANGE_RATE = PREFIX + 'GET_EXCHANGE_RATE';
export const GET_EXCHANGE_RATE_FAILED = PREFIX + 'GET_EXCHANGE_RATE_FAILED';
export const GET_EXCHANGE_RATE_SUCCESS = PREFIX + 'GET_EXCHANGE_RATE_SUCCESS';

export const GET_CURRENCIES = PREFIX + 'GET_CURRENCIES';
export const GET_CURRENCIES_FAILED = PREFIX + 'GET_CURRENCIES_FAILED';
export const GET_CURRENCIES_SUCCESS = PREFIX + 'GET_CURRENCIES_SUCCESS';

export const PUT_PREFERRED_CURRENCY = PREFIX + 'PUT_PREFERRED_CURRENCY';
export const PUT_PREFERRED_CURRENCY_FAILED = PREFIX + 'PUT_PREFERRED_CURRENCY_FAILED';
export const PUT_PREFERRED_CURRENCY_SUCCESS = PREFIX + 'PUT_PREFERRED_CURRENCY_SUCCESS';

export const clearCurrencyReducer = () => (dispatch: any) => {
  dispatch({ type: CLEAR_CURRENCIES });
};

export const getCurrencies = () => async (dispatch: any) => {
  try {
    if (!isAuthenticated()) {
      return null;
    }
    dispatch({ type: GET_CURRENCIES });
    const config = await axiosConfig('customerAccessToken');

    const response = await axios.get(`${API_URL}/currencies`, config);
    dispatch({
      type: GET_CURRENCIES_SUCCESS,
      payload: response.data.currencies,
    });
  } catch (error) {
    dispatch({ type: GET_CURRENCIES_FAILED, payload: getErrorMessage(error) });
  }
};

interface ExchangeRateResponse {
  id: number;
  rate: number;
  createdDate: string;
  currency: {
    code: string;
    symbol: string;
  };
  toCurrency: {
    code: string;
    symbol: string;
  };
}
export const getExchangeRates = () => async (dispatch: any) => {
  try {
    if (!isAuthenticated()) {
      return null;
    }
    dispatch({ type: GET_EXCHANGE_RATE });
    const config = await axiosConfig('customerAccessToken');
    const response = await axios.get(`${API_URL}/currencies/exchange-rates`, config);
    const paylod: any = {};

    response.data.exchangeRates.map((item: ExchangeRateResponse) => {
      paylod[item.toCurrency.code] = item.rate;
    });
    dispatch({
      type: GET_EXCHANGE_RATE_SUCCESS,
      payload: paylod,
    });
  } catch (error) {
    dispatch({ type: GET_EXCHANGE_RATE_FAILED, payload: getErrorMessage(error) });
  }
};

export const setPreferredCurrency = (code: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PUT_PREFERRED_CURRENCY });
    const config = await axiosConfig('customerAccessToken');
    await axios.put(
      `${API_URL}/users/me/preferred-currency`,
      {
        code,
      },
      config,
    );
    dispatch({
      type: PUT_PREFERRED_CURRENCY_SUCCESS,
      payload: 'Updated preferred currency successfully',
    });
  } catch (error) {
    dispatch({ type: PUT_PREFERRED_CURRENCY_FAILED, payload: getErrorMessage(error) });
  }
};
