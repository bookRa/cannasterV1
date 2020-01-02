import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { useMainDispatch } from "../Layout/MainPageContext";
import {Search, Grid, Header, Segment} from 'semantic-ui-react'
import {IProduct} from '../Interfaces/CommonInterfaces'
import * as prodApi from '../API/ProdSearch'
import { SearchProductAction } from '../Interfaces/MainDispatchers';

interface ISearchResult extends Omit<IProduct,'price'> {title: string, price: string}

const marshalResultToProduct = (result: ISearchResult):IProduct =>{
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

const marshallProductToResult = (product: IProduct):ISearchResult =>({
    ...product,
    title: product.name,
    price: `$${product.price}`

})

export const SearchBar = () => {
    const {dispatch} = useMainDispatch()
    const allProducts: IProduct[] = prodApi.getAllProducts()

    const [searchVal, setSearchVal] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [results, setResults] = useState([] as ISearchResult[])
    const handleResultSelect = (e:any, {result}:{result: ISearchResult}) => {
        dispatch({type:"SEARCH-PRODUCT", payload: marshalResultToProduct(result)})
        setSearchVal("")
    }

    // TODO: make this an API call
    const handleSearchChange = (e:any, {value}: {value?:string}) =>{ 
        setLoading(true)
        setSearchVal(value || '')

        setTimeout(()=>{
            if(value && value.length <1){
                setLoading(false)
                setSearchVal('')
                setResults([])
            }else{
                const re = new RegExp(_.escapeRegExp(value), 'i')
                const isMatch = (result:IProduct) =>{
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
        <Search
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 500, {leading: true})}
        value={searchVal}
        results={results}
        />
    )
}
