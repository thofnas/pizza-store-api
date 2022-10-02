- "yarn dev" to run index.js
- "yarn build" to build index.js

## Requests
### Images

* `https://pizza-store.s3.eu-central-1.amazonaws.com/:image_path`

### Get

* `/foods` - fetch all
  * `?page=`, `?limit=` and `?types=` are an awaliable queries. page=1 and limit=20 by default, types are/is an ids of foods
  * `/:id` - Fetch one by it's id
* `/foodtypes` - all types
  * `/:id` 
* `/orders` - all orders. **requires** to be logged in
  * `?page=` and `?limit=` are an awaliable queries. page=1 and limit=20 by default
  * `/:id` - search by order id

### Post

All requires to be logged in, except `/auth/login` and `/orders`
* `/foods`
* `/foodtypes`
* `/orders` - **not requires** to be logged in
* `/auth`
 * `/login` - **not requires** to be logged in
 * `/register` 
 * `/logout`
 
### Patch

All requires to be logged in
* `/foods/:id`
* `/foodtypes/:id`
* `/orders/:id`

### Delete

All requires to be logged in
* `/foods/:id`
* `/foodtypes/:id`
* `/orders/:id`

## For post requests
### Foods
|         Data         |     Is Required     |
| -------------------- |:-----------------:|
| name `string`        | +(unique)  |
| description `string` | -          |
| price `number`       | +          |
| type `objectId`      | +          |
| image `png`          | +          |
| calories `number`    | +          |
| fat `number`         | +          |
| carbs `number`       | +          |
| proteins `number`    | +          |
| salt `number`        | +          |
| sugar `number`       | +          |

### Food Types
|       Data        |       Is Required       |
| ----------------- |:-----------------:|
| type `string`     | +(unique)  |

### Orders
|       Data            | Is Required | Post | Patch |
| --------------------- |:-----------:|:----:|:-----:|
| order_status `string` |      +      |  -   |   +   |
| foods `string[]`      |      +      |  +   |   +   |
| customer_name `string`|      +      |  +   |   +   |
| phone `number`        |      +      |  +   |   +   |
| address `string`      |      +      |  +   |   +   |
| email `string`        |      -      |  +   |   +   |

