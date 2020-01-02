import products from "./ProdStub.json";
import {IProduct, ICannasterItem} from "../Interfaces/CommonInterfaces"
import _ from 'lodash'

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