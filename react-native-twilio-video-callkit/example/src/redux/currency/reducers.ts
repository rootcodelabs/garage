import {
  CLEAR_CURRENCIES,
  GET_EXCHANGE_RATE,
  GET_EXCHANGE_RATE_FAILED,
  GET_EXCHANGE_RATE_SUCCESS,
  GET_CURRENCIES,
  GET_CURRENCIES_FAILED,
  GET_CURRENCIES_SUCCESS,
  PUT_PREFERRED_CURRENCY,
  PUT_PREFERRED_CURRENCY_FAILED,
  PUT_PREFERRED_CURRENCY_SUCCESS,
} from './actions';

export interface ExchangeRateType {
  [code: string]: number;
}

export interface CurrencyType {
  code: string;
  symbol: string;
}

export interface CurrencyInitialState {
  isLoading: boolean;
  currencies: CurrencyType[];
  exchangeRates: null | ExchangeRateType;
  currencyError: null;
  updatedPreferredCurrencyMessage: string | null;
}

export const initialState: CurrencyInitialState = {
  isLoading: false,
  currencies: [],
  exchangeRates: null,
  currencyError: null,
  updatedPreferredCurrencyMessage: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return { ...state, isLoading: true, currencyError: null };
    case GET_CURRENCIES_FAILED:
      return { ...state, isLoading: false, currencyError: action.payload };
    case GET_CURRENCIES_SUCCESS:
      return { ...state, isLoading: false, currencies: action.payload };

    case GET_EXCHANGE_RATE:
      return { ...state, isLoading: true, currencyError: null };
    case GET_EXCHANGE_RATE_FAILED:
      return { ...state, isLoading: false, currencyError: action.payload };
    case GET_EXCHANGE_RATE_SUCCESS:
      return { ...state, isLoading: false, exchangeRates: action.payload };

    case PUT_PREFERRED_CURRENCY:
      return { ...state, isLoading: true, currencyError: null };
    case PUT_PREFERRED_CURRENCY_FAILED:
      return { ...state, isLoading: false, currencyError: action.payload };
    case PUT_PREFERRED_CURRENCY_SUCCESS:
      return { ...state, isLoading: false, updatedPreferredCurrencyMessage: action.payload };

    case CLEAR_CURRENCIES:
      return { ...state, currencyError: null, updatedPreferredCurrencyMessage: null };
    default:
      return state;
  }
};

export default authReducer;
