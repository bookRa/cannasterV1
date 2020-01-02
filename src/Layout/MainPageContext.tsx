import React, { Dispatch, useEffect, useState, useReducer, Children, useContext } from "react";
import { IProduct, ICannasterItem, IMainState } from "../Interfaces/CommonInterfaces"
import {
    IAction,
    SearchProductAction,
    UpdateProductCountAction
} from "../Interfaces/MainDispatchers"
import * as prodApi from "../API/ProdSearch";

/* One Context deals with the dispatch actions, the other maintains state */
const MainStateContext = React.createContext<IMainState | undefined>(undefined)
const MainDispatchContext = React.createContext<Dispatch<SearchProductAction | UpdateProductCountAction> | undefined>(undefined)

/* Typeguard Functions for the reducer*/
function isSearchProductAction(action: IAction): action is SearchProductAction {
    return action.type === "SEARCH-PRODUCT"
}
function isUpdateProductCountAction(action: IAction): action is UpdateProductCountAction {
    return action.type === "UPDATE-PRODUCT-COUNT"
}

// @TODO breakup into reducers for different components
function mainReducer(state: IMainState, action: IAction):IMainState {
    if (isSearchProductAction(action)) {
        return { cannaster: state.cannaster, simSearch: [...prodApi.searchProduct(action.payload)] }
    }
    if (isUpdateProductCountAction(action)) {
        const newCannaster = [...state.cannaster]
        const currId = action.payload.product.id
        const updatedQty = action.payload.quantity
        const existingIdx = newCannaster.findIndex(item => item.id === currId)
        if (existingIdx > -1) {
            const newQuantity = newCannaster[existingIdx].quantity + updatedQty
            if (updatedQty === 0 || newQuantity === 0) { // prduct was deleted from cannaster
                newCannaster.splice(existingIdx, 1)
            } else {
                newCannaster[existingIdx].quantity = newQuantity
            }
        } else {
            const newProduct: ICannasterItem = { ...action.payload.product, quantity: action.payload.quantity }
            newCannaster.push(newProduct)
        }
        return { cannaster: newCannaster, simSearch: state.simSearch }

    }
    else {
        throw new Error("invalid reducer Action")
    }
}

export const MainDispatch = React.createContext({} as Dispatch<SearchProductAction | UpdateProductCountAction>)

const MainContextProvider:React.FC = (props) => {
    const initialState: IMainState = { cannaster: [], simSearch: [] }
    const [state, dispatch] = useReducer(mainReducer, initialState)

    return (
        <MainStateContext.Provider value={state}>
            <MainDispatchContext.Provider value={dispatch}>
                {props.children}
            </MainDispatchContext.Provider>
        </MainStateContext.Provider>
    )
}

function useMainState(){
    const context = useContext(MainStateContext)
    if (context === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
      }
      return context
}

function useMainDispatch(){
    const dispatch = useContext(MainDispatchContext)
    if (dispatch === undefined) {
        throw new Error('useCountDispatch must be used within a CountProvider')
      }
    //   Define some common updates
    const incrementProduct = (product: IProduct) => dispatch({type:'UPDATE-PRODUCT-COUNT', payload:{
        product,
        quantity: 1
    }})
    const decrementProduct = (product: IProduct) => dispatch({type:'UPDATE-PRODUCT-COUNT', payload:{
        product,
        quantity: -1
    }})
    const deleteProduct = (product: IProduct) => dispatch({type:'UPDATE-PRODUCT-COUNT', payload:{
        product,
        quantity: 0
    }})
      return {
          dispatch,
          incrementProduct,
          decrementProduct,
          deleteProduct
        }
}
export {MainContextProvider, useMainState, useMainDispatch}