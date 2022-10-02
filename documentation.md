- "yarn dev" to run index.js
- "yarn build" to build index.js

## Requests
### Images

```
https://pizza-store.s3.eu-central-1.amazonaws.com/
``` 
example: `https://pizza-store.s3.eu-central-1.amazonaws.com/633972831df1a16e0570f84c.png`

### Get

* `/foods` - fetch all
  * awaliable queries(all optional):
    * `?page=` - number of page. **1** by default
    * `?limit=` - limit of items. **20** by default
    * `?search=` - searching by name of food
    * `?types=` - searching by type. type is an **id**. 
  * `/:id` - Fetch one by it's id
* `/foodtypes` - all types
  * `/:id` - one by id
* `/orders` - all orders. **requires** to be logged in
  * awaliable queries(all optional):
    * `?page=` - number of page. **1** by default
    * `?limit=` - limit of items. **20** by default
  * `/:id` - one by id

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
| foods `number[]`      |      +      |  +   |   +   |
| customer_name `string`|      +      |  +   |   +   |
| phone `number`        |      +      |  +   |   +   |
| address `string`      |      +      |  +   |   +   |
| email `string`        |      -      |  +   |   +   |

