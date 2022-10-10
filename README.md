## Trades API
### Example API for stock trades
____

#### Install dependencies
```Shell
$ npm install
```

#### Connect to a database
Create local PostgreSQL database `tradesDb` (or any other name).

Add `.env` file to the root directory of the project:

```Shell
DATABASE_URL=postgresql://pguser:pgpass@localhost:5432/tradesDB?schema=public
```
Run migrations:
```Shell
$ npx prisma migrate dev
```
Run seeding script:
```Shell
$ npm run db:seed
````  

#### Start server on port 1234:
```Shell
$ npm run dev
```
### Some requests to check
```Shell
$ curl 'localhost:1234/stocks' | json_pp
$ curl 'localhost:1234/stocks?userId=3' | json_pp
$ curl 'localhost:1234/stocks/ABX/price?start=2020-09-11T14%3A20%3A30.000%2B03%3A00&end=2022-09-11T15%3A01%3A30.000%2B03%3A00'
$ curl -X POST 'localhost:1234/stocks' \
--header 'Content-Type: application/json' \
--data-raw '{
  "type": "buy",
  "userId": 12,
  "symbol": "ABX",
  "price": 134.26,
  "timestamp": "2022-09-11T19:20:30.45+03:00"
}'
$ curl -X DELETE 'localhost:1234/stocks'
```
