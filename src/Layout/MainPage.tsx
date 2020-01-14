import React, { useEffect, useState } from "react";
import { Grid, Segment, Container, Divider, Menu, Icon, Sidebar, Header } from "semantic-ui-react"
import { Cannaster } from "../Components/Cannaster";
import { SearchBar } from "../Components/ProductSearch"
import { SimSearch } from "../Components/SimSearch"
import { MainContextProvider } from "./MainPageContext";
import { NavMenu } from "./NavMenu"

const MainPage = () => {

    useEffect(() => {
        // Initialize some stuff, like get the user's cannaster etc.
    })
    const [showSide, setShowSide] = useState(true)
    return (
        <MainContextProvider>
            <NavMenu toggleCannaster={() => setShowSide(!showSide)} />
            <Container >
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        // as={Menu}
                        animation='overlay'
                        icon='labeled'
                        direction='right'
                        // onHide={() => setShowSide(false)}
                        // vertical
                        visible={showSide}
                        width='wide'
                    >
                        <Cannaster />
                    </Sidebar>

                    <Sidebar.Pusher dimmed={showSide}>
                        <Segment basic>
                            <SearchBar />
                            <Divider horizontal>Search Results </Divider>
                            <SimSearch />
                            <Header as='h3'>Application Content</Header>
                            <Divider horizontal>Other Recommendations</Divider>
                            <Segment color='orange'>Reccs</Segment>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
            {/* <Sidebar
                    as={Segment}
                    animation='overlay'
                    onHide={()=> setShowSide(false)}
                    visible={showSide}
                    direction='right'> */}
            {/* <Cannaster /> */}
            {/* <Header as='h1'>Hello</Header>
                    </Sidebar>
                </Sidebar.Pushable>
                <Sidebar.Pusher>
                    <Header as='h2'>Hi?</Header> */}
            {/* <SearchBar />
                    <Divider horizontal>Search Results</Divider>
                    <SimSearch />
                    <Divider horizontal>Other Recommendations</Divider>
                    <Segment color="orange">Reccs</Segment> */}
            {/* </Sidebar.Pusher> */}
        </MainContextProvider >
    )
}

export default MainPage