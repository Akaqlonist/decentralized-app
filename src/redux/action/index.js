import { createAction } from "redux-actions";

export const WEB3_ACCOUNT = "WEB3_ACCOUNT";
export const SET_BALANCE = "SET_BALANCE";
export const WEB3_NETWORKID = "WEB3_NETWORKID";
export const IS_LOADING = "IS_LOADING";
export const SET_IS_SIGNED = "SET_IS_SIGNED";
export const SET_VAULT = "SET_VAULT";

export const set_web3_account = createAction(WEB3_ACCOUNT);
export const set_balance = createAction(SET_BALANCE);
export const set_web3_networkID = createAction(WEB3_NETWORKID);
export const set_is_loading = createAction(IS_LOADING);
export const set_is_signed = createAction(SET_IS_SIGNED);
export const set_vault = createAction(SET_VAULT);