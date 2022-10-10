# Trades API
#### Example API for stock trades allows:
- to create a trade, 
- to list all the trades, 
- to list all the trades from given userId, 
- to get the maximum trade price for the given currency in the given period of time,
- to delete all trades from the database.
____
## 1. Running locally

#### Install dependencies
```Shell
$ npm install
```

#### Connect to a database
Create local PostgreSQL database `tradesDb` (or any other name).

Add `.env` file to the root directory of the project:

```Shell
DATABASE_URL=postgresql://pguser:pgpass@localhost:5432/tradesDb
```
#### Run migrations:
```Shell
$ npx prisma migrate dev
```
#### Run seeding script:
```Shell
$ npm run db:seed
````  

#### Start server on port 1234:
```Shell
$ npm run dev
```

## 2. Running tests with Docker
To start, run:
```Shell
$ docker compose up
```
These actions are being performed: 
- creates a container with PostreSQL database,
- creates a container with an Express app,
- seeds the created database with some Faker data
- runs unit tests (mocking Prisma client)
- runs integration tests using created test database

<sub><sup>(To stop, press Ctrl+C)</sub></sup>

To remove containers and volumes, run:
```Shell
$ docker compose down -v
```

## 3. Some requests to check
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
