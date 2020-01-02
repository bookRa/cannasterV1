// Action Interfaces for Dispatcher
import {IProduct} from './CommonInterfaces'

export interface IAction {
    type: "SEARCH-PRODUCT" | "UPDATE-PRODUCT-COUNT"
}

export interface SearchProductAction extends IAction {
    payload: IProduct
}

// TODO: Search By Keyword
interface SearchKeywordAction extends IAction{
    payload: string
}

export interface UpdateProductCountAction extends IAction{
    payload: {
        product: IProduct,
        quantity: number,
    }
}

// TODO: Show Product Details
interface ShowProductModal extends IAction{
    payload: IProduct
}