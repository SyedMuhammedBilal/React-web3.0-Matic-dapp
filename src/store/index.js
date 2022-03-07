import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux"
import smartContractSlice from "./smartContract"

const store = configureStore({
    reducer: {
        smartContract: smartContractSlice
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;