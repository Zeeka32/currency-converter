import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Currency, CurrencyCode } from "@/shared/constants/flagIcons";
import {
  type ConversionLog,
  type FavoritePair,
  type GraphRange,
  type AddLogPayload,
  getInitialState,
  currencyConverterReducer,
  STORAGE_KEY,
} from "./currencyReducer";

type CurrencyConverterContextValue = {
  amount: number;
  sourceCurrency: Currency;
  targetCurrency: Currency;
  selectedGraphRange: GraphRange;
  favorites: FavoritePair[];
  logs: ConversionLog[];

  setAmount: (amount: number) => void;
  setSourceCurrency: (currency: Currency) => void;
  setTargetCurrency: (currency: Currency) => void;
  setSelectedGraphRange: (range: GraphRange) => void;

  toggleFavorite: (from: CurrencyCode, to: CurrencyCode) => void;
  isFavorite: (from: CurrencyCode, to: CurrencyCode) => boolean;

  addLog: (payload: AddLogPayload) => void;
  deleteLog: (id: string) => void;
  clearLogs: () => void;
};

const CurrencyConverterContext =
  createContext<CurrencyConverterContextValue | null>(null);

export function CurrencyConverterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    currencyConverterReducer,
    undefined,
    getInitialState,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CurrencyConverterContextValue>(() => {
    return {
      amount: state.amount,
      sourceCurrency: state.sourceCurrency,
      targetCurrency: state.targetCurrency,
      selectedGraphRange: state.selectedGraphRange,
      favorites: state.favorites,
      logs: state.logs,

      setAmount: (amount) => {
        dispatch({
          type: "SET_AMOUNT",
          payload: amount,
        });
      },

      setSourceCurrency: (currency) => {
        dispatch({
          type: "SET_SOURCE_CURRENCY",
          payload: currency,
        });
      },

      setTargetCurrency: (currency) => {
        dispatch({
          type: "SET_TARGET_CURRENCY",
          payload: currency,
        });
      },

      setSelectedGraphRange: (range) => {
        dispatch({
          type: "SET_GRAPH_RANGE",
          payload: range,
        });
      },

      toggleFavorite: (from, to) => {
        dispatch({
          type: "TOGGLE_FAVORITE",
          payload: {
            from,
            to,
          },
        });
      },

      isFavorite: (from, to) => {
        return state.favorites.some(
          (favorite) => favorite.from === from && favorite.to === to,
        );
      },

      addLog: (payload) => {
        dispatch({
          type: "ADD_LOG",
          payload,
        });
      },

      deleteLog: (id) => {
        dispatch({
          type: "DELETE_LOG",
          payload: id,
        });
      },

      clearLogs: () => {
        dispatch({
          type: "CLEAR_LOGS",
        });
      },
    };
  }, [state]);
  return (
    <CurrencyConverterContext value={value}>
      {children}
    </CurrencyConverterContext>
  );
}

export function useCurrencyConverter() {
  const context = use(CurrencyConverterContext);

  if (!context) {
    throw new Error(
      "useCurrencyConverter must be used inside CurrencyConverterProvider",
    );
  }

  return context;
}
