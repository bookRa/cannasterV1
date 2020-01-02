// import products from "./ProdStub.json";
import {IProduct, ICannasterItem, ICategory, IProperty} from "../Interfaces/CommonInterfaces"
import _ from 'lodash'
import faker from 'faker';

const catKeys: ICategory[]= Object.values(ICategory).map(k => k as ICategory).filter(v => typeof v === 'string')
const propKeys:IProperty[] = Object.values(IProperty).map(k => k as IProperty).filter(v => typeof v === 'string')
console.log('catKeys is')
console.log(catKeys)
console.log('propKeys is')
console.log(propKeys)

const products: IProduct[] = _.times(25, n=>({
    id: faker.random.uuid(),
    name: faker.fake("{{hacker.noun}} {{commerce.product}}"),
    price: Number(faker.finance.amount(2, 15, 2)),
    description: faker.company.catchPhrase(),
    image: faker.image.cats(),
    categories: _.sampleSize(catKeys, 2),
    properties : _.sampleSize(propKeys, 4),
    
}))
// currently all stubbed out with fake data
// export namespace ProductAPI {
    export function getAllProducts():IProduct[]{
         return products as IProduct[]
    }

    export function searchProduct(product: IProduct): IProduct[]{
        return [product, ..._.sampleSize(products, 5).filter(p => p.id !== product.id)]
    }
// }














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