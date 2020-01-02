import React, { useState, useEffect } from 'react'
import { IProduct, ICannasterItem } from '../Interfaces/CommonInterfaces'
import { Item, Label, Container, Icon, Header, Button } from 'semantic-ui-react'
import { useMainDispatch, useMainState } from "../Layout/MainPageContext";

export const Cannaster: React.FC= () => {
    const cannaster = useMainState().cannaster
    const dispatch = useMainDispatch()

    const [total, setTotal] = useState(0.00)

    return (
        <>
            <Header as='h3'>Cannaster</Header>
            <Item.Group divided>
                {cannaster.map((item, idx) => (
                    <Item key={item.id}>
                        <Item.Image size='tiny' src={item.image || 'https://react.semantic-ui.com/images/wireframe/image.png'} />
                        <Item.Content>
                            <Item.Header as='a'>{item.name}</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>${item.price.toFixed(2)}</span>
                            </Item.Meta>
                            <Item.Description>{item.description}</Item.Description>
                            <Item.Extra>
                                <Label>{item.quantity}</Label>
                                <Button floated='right'>Buy</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </>
    )

}