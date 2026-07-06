import {
  currencies,
  type Currency,
  type CurrencyCode,
} from "@/shared/constants/flagIcons";
import { v4 as uuidv4 } from "uuid";

export type GraphRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

export type FavoritePair = {
  id: string;
  from: CurrencyCode;
  to: CurrencyCode;
  createdAt: string;
};

export type ConversionLog = {
  id: string;
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  convertedAmount: number;
  createdAt: string;
};

export type AddLogPayload = {
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
  rate: number;
  convertedAmount: number;
};

export type CurrencyConverterState = {
  amount: number;
  sourceCurrency: Currency;
  targetCurrency: Currency;
  selectedGraphRange: GraphRange;
  favorites: FavoritePair[];
  logs: ConversionLog[];
};

export const STORAGE_KEY = "currency-converter-state";

const defaultSourceCurrency = currencies.find(
  (currency) => currency.code === "USD",
);
const defaultTargetCurrency = currencies.find(
  (currency) => currency.code === "EGP",
);

if (!defaultSourceCurrency || !defaultTargetCurrency) {
  throw new Error("Default currencies are missing from currencies list");
}

export const initialState: CurrencyConverterState = {
  amount: 1,
  sourceCurrency: defaultSourceCurrency,
  targetCurrency: defaultTargetCurrency,
  selectedGraphRange: "1D",
  favorites: [],
  logs: [],
};

export type CurrencyConverterAction =
  | {
      type: "SET_AMOUNT";
      payload: number;
    }
  | {
      type: "SET_SOURCE_CURRENCY";
      payload: Currency;
    }
  | {
      type: "SET_TARGET_CURRENCY";
      payload: Currency;
    }
  | {
      type: "SET_GRAPH_RANGE";
      payload: GraphRange;
    }
  | {
      type: "TOGGLE_FAVORITE";
      payload: {
        from: CurrencyCode;
        to: CurrencyCode;
      };
    }
  | {
      type: "ADD_LOG";
      payload: AddLogPayload;
    }
  | {
      type: "DELETE_LOG";
      payload: string;
    }
  | {
      type: "CLEAR_LOGS";
    };

export function getInitialState(): CurrencyConverterState {
  const storedState = localStorage.getItem(STORAGE_KEY);

  if (!storedState) return initialState;

  try {
    return {
      ...initialState,
      ...JSON.parse(storedState),
    };
  } catch {
    return initialState;
  }
}

export function currencyConverterReducer(
  state: CurrencyConverterState,
  action: CurrencyConverterAction,
): CurrencyConverterState {
  switch (action.type) {
    case "SET_AMOUNT": {
      return {
        ...state,
        amount: action.payload,
      };
    }

    case "SET_SOURCE_CURRENCY": {
      return {
        ...state,
        sourceCurrency: action.payload,
      };
    }

    case "SET_TARGET_CURRENCY": {
      return {
        ...state,
        targetCurrency: action.payload,
      };
    }

    case "SET_GRAPH_RANGE": {
      return {
        ...state,
        selectedGraphRange: action.payload,
      };
    }

    case "TOGGLE_FAVORITE": {
      const existingFavorite = state.favorites.find(
        (favorite) =>
          favorite.from === action.payload.from &&
          favorite.to === action.payload.to,
      );

      if (existingFavorite) {
        return {
          ...state,
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== existingFavorite.id,
          ),
        };
      }

      return {
        ...state,
        favorites: [
          ...state.favorites,
          {
            id: uuidv4(),
            from: action.payload.from,
            to: action.payload.to,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }

    case "ADD_LOG": {
      return {
        ...state,
        logs: [
          {
            id: uuidv4(),
            amount: action.payload.amount,
            from: action.payload.from,
            to: action.payload.to,
            rate: action.payload.rate,
            convertedAmount: action.payload.convertedAmount,
            createdAt: new Date().toISOString(),
          },
          ...state.logs,
        ],
      };
    }

    case "DELETE_LOG": {
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
      };
    }

    case "CLEAR_LOGS": {
      return {
        ...state,
        logs: [],
      };
    }

    default:
      return state;
  }
}
