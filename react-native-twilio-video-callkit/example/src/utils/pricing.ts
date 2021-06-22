import { store } from '../App';
import { DEFAULT_CURRENCY } from '../constance';

function getPricingWithCurrency(price: number, currencySymbol: string, exchangeRate: number) {
  if (price === 0) {
    return 'Free';
  }
  const convertedPrice = price * Number(exchangeRate.toFixed(2));
  let newPrice = parseFloat(humanPrice(convertedPrice) + '');
  newPrice = Math.round((newPrice + Number.EPSILON) * 100) / 100;

  return `${currencySymbol}${newPrice.toLocaleString('en').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function getPriceByCurrencies(price: number) {
  const state = store.getState();
  const { preferredCurrency } = state.profile;
  const { exchangeRates } = state.currency;

  if (preferredCurrency && preferredCurrency.code === DEFAULT_CURRENCY.code) {
    return {
      price: getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
      defaultPrice: null,
      priceInDollars: getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
    };
  } else if (preferredCurrency && exchangeRates && exchangeRates[preferredCurrency.code]) {
    return {
      price: getPricingWithCurrency(price, preferredCurrency.symbol, exchangeRates[preferredCurrency.code]),
      defaultPrice: price === 0 ? null : getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
      priceInDollars: getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
    };
  }
  return {
    price: getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
    defaultPrice: null,
    priceInDollars: getPricingWithCurrency(price, DEFAULT_CURRENCY.symbol, 1),
  };
}

export function humanPrice(price: number | string): number {
  try {
    return Number(price) / 100;
  } catch (error) {
    return 0;
  }
}

export function machinePrice(price: number | string): number {
  try {
    return Number(price) * 100;
  } catch (error) {
    return 0;
  }
}
