import React, { Dispatch, useEffect, useState, useReducer } from "react";
import { Grid, Segment, Container, Divider } from "semantic-ui-react"
import { Cannaster } from "../Components/Cannaster";
import { SearchBar } from "../Components/SearchBar"
import { SimSearch } from "../Components/SimSearch"
import { IProduct, ICannasterItem, IMainState } from "../Interfaces/CommonInterfaces"
import {
    IAction,
    SearchProductAction,
    UpdateProductCountAction
} from "../Interfaces/MainDispatchers"
import * as prodApi from "../API/ProdSearch";
import { MainContextProvider } from "./MainPageContext";

const MainPage = () => {

    useEffect(() => {
        // Initialize some stuff, like get the user's cannaster etc.
    })

    return (
        <MainContextProvider>
            <Container >
                <Grid divided>
                    <Grid.Column width={12}>
                        {/* <Segment> */}
                            <SearchBar />
                            <Divider horizontal>Search Results</Divider>
                            <SimSearch />
                            <Divider horizontal>Other Recommendations</Divider>
                            <Segment color="orange">Reccs</Segment>
                        {/* </Segment> */}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Cannaster />
                    </Grid.Column>
                </Grid>
            </Container>
        </MainContextProvider>
    )
}

export default MainPage