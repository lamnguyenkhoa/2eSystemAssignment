# Technical assignment for 2esystem

It's a simple webapp with basic CRUD functions to manage a SQL database.

There are 4 tables in the database: Airport, Airline, Country and Flight.

Stack: React, Bootstrap, ExpressJS, SQL, GoogleMap API

## Installation

Add `.env` files to the project and fill in neccessary information into it.

You can run these in the terminal:

### Core commands

#### `npm install` at root and frontend folder

To install the neccessary dependencies. Remember to do this in both root folder and `/frontend` folder.

#### `npm run build` at frontend folder

To build static files.

#### `npm start` at frontend folder

To start the frontend.

#### `npm run dev` at root folder

To runs the server backend in the development mode.

After run all above commands (ideally in 2 terminals, one for frontend and one for backend), it should open a new web window at `localhost:3000` and displayed some frontpage content there.

## Deployed link

<https://assignment-2esystem.herokuapp.com/>

Note: If the table data don't change, try to refresh the webpage.

## .env file

There are 2 `.env` files. One frontend `.env` file in `/frontend` folder (same level as `/src` and `/public`) and another backend `.env` file at root folder (same level as `server.js` and `Procfile`)

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
