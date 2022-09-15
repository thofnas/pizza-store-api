- "yarn dev" to run index.js
- "yarn build" to build index.js

## requests
### Get

Fetch all or one by id 
* `/foods` `/:id`
* `/foodtypes` `/:id`
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
* `/foods/:id`
* `/foodtypes/:id`
* `/orders/:id`

### Delete

All requires to be logged in
* `/foods/:id`
* `/foodtypes/:id`
* `/orders/:id`

### Images

They stored in *public* folder
* `/foods/images/:imagepath`

## For post/patch requests
### Foods
|       Data        |       State       |
| ----------------- |:-----------------:|
| name `string`     | required(unique)  |
| price `number`    | required          |
| type `objectId`   | required          |
| image `file`      | required          |
| calories `number` | required          |
| fat `number`      | required          |
| sugar `number`    | required          |
| sugar `salt`      | required          |

### Food Types
|       Data        |       State       |
| ----------------- |:-----------------:|
| type `string`     | required(unique)  |

### Orders
|       Data            |  State   | 
| --------------------- |:--------:|
| foods `string[]`      | required |
| customer_name `string`| required |
| phone `number`        | required |
| address `string`      | required |
