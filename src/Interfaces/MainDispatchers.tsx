// Action Interfaces for Dispatcher
import {IProduct} from './CommonInterfaces'

export interface IAction {
    type: string
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

/* Typeguard Functions */

export function isSearchProductAction(action: IAction): action is SearchProductAction {
    return action.type === "SEARCH-PRODUCT"
}

export function isUpdateProductCountAction(action: IAction): action is UpdateProductCountAction {
    return action.type === "UPDATE-PRODUCT-COUNT"
}