import {
  WEB3_ACCOUNT,
  SET_BALANCE,
  WEB3_NETWORKID,
  IS_LOADING,
  SET_VAULT,
  SET_IS_SIGNED,
} from "../action";
import { combineReducers } from "redux";

const accountReducer = (state = "", action) => {
  if (action.type === WEB3_ACCOUNT) return action.payload;
  return state;
};

const networkIDReducer = (state = "", action) => {
  if (action.type === WEB3_NETWORKID) return action.payload;
  return state;
};

const balanceReducer = (state = -1, action) => {
  if (action.type === SET_BALANCE) return action.payload;
  return state;
}

const isLoadingReducer = (state = false, action) => {
  if (action.type === IS_LOADING) return action.payload;
  return state;
};

const isSignedReducer = (state = false, action) => {
  if (action.type === SET_IS_SIGNED) return action.payload;
  return state;
};

const vaultReducer = (state = null, action) => {
  if (action.type === SET_VAULT) return action.payload;
  return state;
};

const rootReducer = combineReducers({
  account: accountReducer,
  networkID: networkIDReducer,
  balance: balanceReducer,
  isLoading: isLoadingReducer,
  isSigned: isSignedReducer,
  vault: vaultReducer,
});

export default rootReducer;
