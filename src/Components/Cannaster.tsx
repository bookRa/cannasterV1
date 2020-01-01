import React, { useState, useEffect } from 'react'
import { Product, CannasterItem } from '../Interfaces/CommonInterfaces'
import { Item, Label, Container, Icon, Header, Button } from 'semantic-ui-react'

interface Props{
    cannaster: CannasterItem[]
}
export const Cannaster: React.FC<Props> = (props) => {
    const {cannaster} = props
    const [total, setTotal] = useState(0.00)

    return (
        <Container>
            <Header as='h3'>Cannaster</Header>
            <Item.Group divided>
                {cannaster.map((item, idx) => (
                    <Item key={item.id}>
                        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header as='a'>{item.name}</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>${item.price.toFixed(2)}</span>
                            </Item.Meta>
                            <Item.Description>{item.description}</Item.Description>
                            <Item.Extra>
                                <Label>Dank</Label>
                                <Button floated='right'>Buy</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Container>
    )

}