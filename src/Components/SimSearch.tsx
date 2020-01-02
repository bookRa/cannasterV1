import _ from 'lodash'
import React, { useContext } from 'react'
import { IProduct } from "../Interfaces/CommonInterfaces"
import { useMainDispatch, useMainState } from "../Layout/MainPageContext"
import { Segment, Card, Image, Button, Header } from "semantic-ui-react"


export const SimSearch = () => {
    const dispatch = useMainDispatch()
    const simSearch = useMainState().simSearch
    const addToCannaster = (product: IProduct) =>{
        dispatch({type:"UPDATE-PRODUCT-COUNT", payload:{product, quantity:1}})
    }
    return simSearch.length ? (
            <Card.Group style={{overflow: 'auto', maxHeight:'35em'}}itemsPerRow={2}>
                {simSearch.map(prod => (
                    <Card key={prod.id}>
                        <Card.Content>
                            <Image
                                floated='right'
                                size='small'
                                src={prod.image}
                            />
                            <Card.Header>{prod.name}</Card.Header>
                            <Card.Meta color="green">${prod.price}</Card.Meta>
                            <Card.Description>
                                {prod.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui one buttons'>
                                <Button basic onClick={()=>addToCannaster(prod)} color='green'>
                                    Add to Cannaster
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
    ) : <Header as="h3">Enter a Search to get similar Items</Header>
}