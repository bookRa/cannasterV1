export interface IProduct{
    name: string
    description?: string
    id: string
    image?: string
    price: number
}

export interface ICannasterItem extends IProduct{
    quantity: number
}

export interface IMainState {
    cannaster: ICannasterItem[],
    simSearch: IProduct[]
}