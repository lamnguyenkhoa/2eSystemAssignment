# Technical assignment for 2esystem

It's a simple webapp with basic CRUD functions to manage a SQL database.

There are 4 tables in the database: Airport, Airline, Country and Flight.

Stack: React, Bootstrap, ExpressJS, SQL, GoogleMap API

## Deployed link

<https://assignment-2esystem.herokuapp.com/>

## .env file

There are 2 `.env` files. One frontend `.env` file in `/frontend` folder (same level as `App.js` and `App.css`) and another backend `.env` file at root folder (same level as `server.js` and `Procfile`)

Frontend `.env` file:

```bash
# FRONTEND
REACT_APP_GOOGLE_API_KEY = _____
```

Backend `.env` file:

```bash
# dev || production
NODE_ENV = _____

# DATABASE
DEV_HOST = _____
DEV_USER = _____
DEV_PASSWORD = _____
DEV_DB = _____

PROD_HOST = _____
PROD_USER = _____
PROD_PASSWORD = _____
PROD_DB = _____
```
