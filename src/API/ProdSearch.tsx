// import products from "./ProdStub.json";
import { IProduct, ICategory, IProperty, ISearchWithFilters } from "../Interfaces/CommonInterfaces"
import _ from 'lodash'
import faker from 'faker';

const catKeys: ICategory[] = Object.values(ICategory).map(k => k as ICategory).filter(v => typeof v === 'string')
const propKeys: IProperty[] = Object.values(IProperty).map(k => k as IProperty).filter(v => typeof v === 'string')

const products: IProduct[] = _.times(25, () => ({
    id: faker.random.uuid(),
    name: faker.fake("{{hacker.noun}} {{commerce.product}}"),
    price: Number(faker.finance.amount(2, 15, 2)),
    description: faker.company.catchPhrase(),
    image: faker.image.cats(),
    categories: _.sampleSize(catKeys, 2),
    properties: _.sampleSize(propKeys, 4),

}))
// currently all stubbed out with fake data
export function getAllProducts(): IProduct[] {
    return products as IProduct[]
}

export function searchProduct(searchWithFilters: ISearchWithFilters): IProduct[] {
    const {product, categories, properties} = searchWithFilters
    console.log("Searching Products:")
    console.log(product, categories, properties)
    const response = product? [product] : []
    if(categories?.length || properties?.length){
        const propFilters = properties ? new Set(properties) : new Set()
        const catFilters = categories ? new Set(categories) : new Set()
        const filteredProducts = products.filter(prod =>(
            (prod.properties.some(p => propFilters.has(p)) || prod.categories.some(c => catFilters.has(c)))
        ))
        if(product) response.push(...filteredProducts.filter(p => p.id !== product.id))
        else response.push(...filteredProducts)

    }
    else if(product){
        response.push(..._.sampleSize(products, 7).filter(p => p.id !== product.id))
    }
    return response
}

export function getProductCategories(): ICategory[]{return catKeys}
export function getProductProperties(): IProperty[]{return propKeys}












// currently stubbed by passing the following into https://json-schema-faker.js.org/:
// {
//     "type": "array",
//     "minItems": 5,
//     "maxItems": 20,
//     "items": {
//       "type": "object",
//       "properties": {
//         "id": {
//           "type": "string",
//           "chance": "guid"
//         },
//         "name": {
//           "type": "string",
//           "faker": {
//             "fake": "{{hacker.noun}} {{commerce.product}} "
//           }
//         },
//         "price": {
//           "type": "number",
//           "faker": "finance.amount"
//         },
//         "description": {
//           "type": "string",
//           "faker": "company.catchPhrase"
//         },
//         "image": {
//           "faker": "random.image"
//         }
//       },
//       "required": [
//         "id",
//         "name",
//         "price",
//         "description",
//         "image"
//       ]
//     }
//   }