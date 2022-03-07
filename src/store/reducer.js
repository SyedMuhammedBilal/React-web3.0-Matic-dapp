import { createContext, useReducer, useContext } from 'react'
// import { initialState } from './initialState'

export const DataLayerContext = createContext(null);

export const DataLayer = ({ initialState, reducer, children }) => {
    return (
        <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataLayerContext.Provider>
    )
}

export const useDataLayerValue = () => useContext(DataLayerContext);

const reducer = (state, action) => {
    switch(action) {
        case "SET_ACCOUNT": 
            return {
                ...state,
                account: action.account
            }
        case "FETCH_ALLPOST":
            return {
                ...state,
                fetchAllPost: action.fetchAllPost
            }
        default:
            return state
    }
}

export default reducer;