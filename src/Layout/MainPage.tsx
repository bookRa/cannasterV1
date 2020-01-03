import React, { useEffect } from "react";
import { Grid, Segment, Container, Divider } from "semantic-ui-react"
import { Cannaster } from "../Components/Cannaster";
import { SearchBar } from "../Components/ProductSearch"
import { SimSearch } from "../Components/SimSearch"
import { MainContextProvider } from "./MainPageContext";
import { NavMenu} from "./NavMenu"

const MainPage = () => {

    useEffect(() => {
        // Initialize some stuff, like get the user's cannaster etc.
    })

    return (
        <MainContextProvider>
            <NavMenu />
            <Container >
                <Grid divided>
                    <Grid.Column width={12}>
                            <SearchBar />
                            <Divider horizontal>Search Results</Divider>
                            <SimSearch />
                            <Divider horizontal>Other Recommendations</Divider>
                            <Segment color="orange">Reccs</Segment>
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