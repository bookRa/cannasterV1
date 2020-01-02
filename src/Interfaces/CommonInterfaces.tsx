export enum ICategory{
    "Flower",
    "Vape",
    "Edible",
    "Topical",
    "Drink",
    "Oil",
    "CBD",
}
export enum IProperty{
    "Relaxing",
    "Indica",
    "Sativa",
    "Hybrid",
    "Funny",
    "Energetic",
    "Calming",
    "Anxiety",
    "Munchies",
    "Clearheaded",
    "Delicious",
    "Pain",
    "CBD",
    "Laughing",
    "Creative",
    "Sleep",
    "Potent"
}
export interface IProduct{
    name: string
    description?: string
    id: string
    image?: string
    price: number
    categories: ICategory[],
    properties: IProperty[]

}

export interface ICannasterItem extends IProduct{
    quantity: number
}

export interface IMainState {
    cannaster: ICannasterItem[],
    simSearch: IProduct[]
}