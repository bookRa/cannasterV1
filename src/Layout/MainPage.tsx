import React, { Dispatch, useEffect, useState, useReducer } from "react";
import { Grid, Segment, Container } from "semantic-ui-react"
import { Cannaster } from "../Components/Cannaster";
import { IProduct, ICannasterItem, IMainState } from "../Interfaces/CommonInterfaces"
import {
     IAction,
     isSearchProductAction,
     isUpdateProductCountAction
 } from "../Interfaces/MainDispatchers"
import { ProductAPI } from "../API/ProdSearch";

const prodApi = new ProductAPI()

const initialState: IMainState = { cannaster: [], simSearch: [] }

// @TODO breakup into reducers for different components
function reducer(state: IMainState, action: IAction) {
    if (isSearchProductAction(action)) {
        return { cannaster: state.cannaster, simSearch: [...prodApi.searchProduct(action.payload), ...state.simSearch,] }
    }
    if (isUpdateProductCountAction(action)) {
        const newCannaster = [...state.cannaster]
        const currId = action.payload.product.id
        const updatedQty = action.payload.quantity
        const existingIdx = newCannaster.findIndex(item => item.id === currId)
        if (existingIdx > -1) {
            if (updatedQty === 0) { // prduct was deleted from cannaster
                newCannaster.splice(existingIdx, 1)
            } else {
                newCannaster[existingIdx].quantity += updatedQty
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


export const MainDispatch = React.createContext({} as Dispatch<IAction>)

const MainPage = () => {

    const allProducts: ICannasterItem[] = prodApi.getAllProducts().map(p => ({ ...p, quantity: 100 }))

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        // Initialize some stuff, like get the user's cannaster etc.
    })

    return (
        <MainDispatch.Provider value={dispatch}>
            <Container >
                <Grid>
                    <Grid.Column width={12}>
                        <Segment color="purple">Search Bar</Segment>
                        <Segment color="yellow">Search Results</Segment>
                        <Segment color="orange">Reccs</Segment>
                    </Grid.Column>
                    <Grid.Column color="green" width={4}>
                        <Cannaster cannaster={state.cannaster}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </MainDispatch.Provider>
    )
}

export default MainPage