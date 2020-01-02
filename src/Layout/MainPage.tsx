import React, { Dispatch, useEffect, useState, useReducer } from "react";
import { Grid, Segment, Container } from "semantic-ui-react"
import { Cannaster } from "../Components/Cannaster";
import { IProduct, ICannasterItem, IMainState } from "../Interfaces/CommonInterfaces"
import {
     IAction,
     isSearchProductAction,
     isUpdateProductCountAction,
     SearchProductAction,
     UpdateProductCountAction
 } from "../Interfaces/MainDispatchers"
import * as prodApi from "../API/ProdSearch";
import {SearchBar} from "../Components/SearchBar"

const initialState: IMainState = { cannaster: [], simSearch: [] }

// @TODO breakup into reducers for different components
function reducer(state: IMainState, action: IAction) {
    if (isSearchProductAction(action)) {
        return { cannaster: state.cannaster, simSearch: [...prodApi.searchProduct(action.payload)] }
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


export const MainDispatch = React.createContext({} as Dispatch<SearchProductAction | UpdateProductCountAction>)

const MainPage = () => {


    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        // Initialize some stuff, like get the user's cannaster etc.
    })

    return (
        <MainDispatch.Provider value={dispatch}>
            <Container >
                <Grid>
                    <Grid.Column width={12}>
                        <SearchBar />
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