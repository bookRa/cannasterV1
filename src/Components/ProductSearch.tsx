import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useMainDispatch } from "../Layout/MainPageContext";
import { Search, Grid, Header } from 'semantic-ui-react'
import { IProduct, IProperty, ICategory, ISearchWithFilters } from '../Interfaces/CommonInterfaces'
import * as prodApi from '../API/ProdSearch'
import EffectFilter from './EffectFilter';

interface ISearchResult extends Omit<IProduct, 'price'> { title: string, price: string }

const marshalResultToProduct = (result: ISearchResult): IProduct => {
    return {
        name: result.title,
        description: result.description,
        id: result.id,
        image: result.image,
        price: Number(result.price.slice(1)),
        categories: result.categories,
        properties: result.properties
    }
}

const marshallProductToResult = (product: IProduct): ISearchResult => ({
    ...product,
    title: product.name,
    price: `$${product.price}`

})

export const SearchBar = () => {
    const { dispatch } = useMainDispatch()
    const allProducts: IProduct[] = prodApi.getAllProducts()

    const [chosenProduct, setChosenProduct] = useState<IProduct | undefined>()
    const [searchVal, setSearchVal] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [results, setResults] = useState([] as ISearchResult[])
    const [searchProps, setSearchProps] = useState([] as IProperty[])
    const [searchCats, setSearchCats] = useState([] as ICategory[])
    const handleResultSelect = (e: any, { result }: { result: ISearchResult }) => {
        const currChosenProduct = marshalResultToProduct(result)
        setSearchVal(result.name)
        setChosenProduct(currChosenProduct)
    }

    useEffect(()=>{
        const payload: ISearchWithFilters = {
            product: chosenProduct,
            properties: searchProps,
            categories: searchCats
        }
        dispatch({ type: "SEARCH-PRODUCT", payload})
    }, [chosenProduct, searchProps, searchCats, dispatch])

    // TODO: make this an API call
    const handleSearchChange = (e: any, { value }: { value?: string }) => {
        setLoading(true)
        setSearchVal(value || '')
        
        setTimeout(() => {
            if (!value) {
                setLoading(false)
                setSearchVal('')
                setResults([])
                setChosenProduct(undefined)
            } else {
                const re = new RegExp(_.escapeRegExp(value), 'i')
                const isMatch = (result: IProduct) => {
                    const nameMatch = re.test(result.name)
                    const descMatch = result.description ? re.test(result.description) : false
                    return nameMatch || descMatch

                }
                setLoading(false)
                setResults(_.filter(allProducts, isMatch).map(prod => marshallProductToResult(prod)))

            }
        }, 300)
    }

    return (
        <Grid stackable columns='2'>
            <Grid.Column width={6}>
                <Header as='h3'>Search a Product</Header>
                 <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={_.debounce(handleSearchChange, 500, { leading: true })}
                value={searchVal}
                results={results}
            />
            </Grid.Column>
            <Grid.Column width={10}>
                <EffectFilter updateCats={setSearchCats} updateProps={setSearchProps} />
            </Grid.Column>
        </Grid>

    )
}
