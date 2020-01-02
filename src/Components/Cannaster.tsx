import React, { useState, useEffect } from 'react'
import { IProduct, ICannasterItem } from '../Interfaces/CommonInterfaces'
import { Item, Label, Image, Container, Icon, Header, Button, Card, Segment } from 'semantic-ui-react'
import { useMainDispatch, useMainState } from "../Layout/MainPageContext";
import _ from 'lodash'
export const Cannaster: React.FC = () => {
    const cannaster = useMainState().cannaster
    const { incrementProduct, decrementProduct, deleteProduct } = useMainDispatch()

    const [total, setTotal] = useState(0.00)

    return (
        <>
            <Header as='h3'>Cannaster</Header>
            <Card.Group style={{ overflow: 'auto', maxHeight: '85vh' }} divided>
                {cannaster.map(product => (
                    <Card key={product.id}>
                        <Card.Content>
                            <Image
                                floated='left'
                                size='tiny'
                                src={product.image || 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
                            />
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Meta>
                                <Label content="category1" />
                                <Label content="category2" />
                            </Card.Meta>
                            <Card.Description>
                                <Label floated='left'>${product.price} x {product.quantity}</Label>
                                <Label color='green' floated='right'>${(product.price * product.quantity).toFixed(2)}</Label>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button.Group attached='bottom'>
                                <Button onClick={() => deleteProduct(product)} icon='trash alternate' color='red' />
                                <Button onClick={() => incrementProduct(product)} icon='plus' color='green' />
                                <Button onClick={() => decrementProduct(product)} icon='minus' color='pink' />
                            </Button.Group>
                        </Card.Content>
                    </Card>
                ))
                }
            </Card.Group>
            <Segment raised clearing>
                Total: ${_.reduce(cannaster, (acc, cannItem) => acc + cannItem.quantity * cannItem.price, 0).toFixed(2)}
                <Button floated='right' animated='vertical'>
                    <Button.Content hidden>Checkout</Button.Content>
                    <Button.Content visible>
                        <Icon name='shop' />
                    </Button.Content>
                </Button>
            </Segment>
        </>
    )

}