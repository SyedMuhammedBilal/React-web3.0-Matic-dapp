import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const smartContractSlice = createSlice({
    name: "smartContract",
    initialState,
    reducers: {
        setAccount: (state, { payload }) => {
            state.account = payload;
        },
    }
})

export const {
    setAccount
} = smartContractSlice.actions;

export default smartContractSlice.reducer;