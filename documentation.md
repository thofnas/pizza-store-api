- "yarn dev" to run index.js
- "yarn build" to build index.js

## requests
### Images

* `https://pizza-store.s3.eu-central-1.amazonaws.com/:image_path`

### Get

Fetch all or one
* `/foods` `/:name` - *name* is a string
* `/foodtypes` `/:type` - *type* is a string
* `/orders` `/:id` - **requires** to be logged

### Post

All requires to be logged in, except `/auth/login` and `/orders`
* `/foods`
* `/foodtypes`
* `/orders` - **not requires** to be logged
* `/auth`
 * `/login` - **not requires** to be logged
 * `/register` 
 * `/logout`
 
### Patch

All requires to be logged in
* `/foods/:name`
* `/foodtypes/:type`
* `/orders/:id`

### Delete

All requires to be logged in
* `/foods/:name`
* `/foodtypes/:type`
* `/orders/:id`

## For post requests
### Foods
|         Data         |     Is Required     |
| -------------------- |:-----------------:|
| name `string`        | +(unique)  |
| description `string` | -      |
| price `number`       | +          |
| type `objectId`      | +          |
| image `png`          | +          |
| calories `number`    | +          |
| fat `number`         | +          |
| carbs `number`       | +          |
| proteins `number`    | +          |
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

