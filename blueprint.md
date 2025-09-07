# Project Blueprint

## Overview

This is a MERN stack social media application. The frontend is built with React and Vite, and the backend is a Node.js/Express server with a MongoDB database.

## Project Structure

```
/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── vite.config.js
├── .gitignore
├── blueprint.md
└── package.json
```

## Setup

1.  **Frontend:**
    *   The frontend is a React application created with Vite.
    *   Dependencies are installed by running `npm install` in the `frontend` directory.
    *   The application is started by running `npm run dev` in the root directory, which proxies to the `frontend` directory.

2.  **Backend:**
    *   The backend is a Node.js/Express server.
    *   Dependencies are installed by running `npm install` in the `backend` directory.
    *   The server is started by running `npm run dev` in the `backend` directory.
    *   The backend requires a `.env` file with the following variables:
        *   `MONGO_URI`: The connection string for the MongoDB database.
        *   `JWT_SECRET`: A secret key for signing JSON Web Tokens.

## Current Status

*   **Frontend:** Running successfully, but with a Node.js version warning.
*   **Backend:** Not running due to an incorrect MongoDB connection string.

## Next Steps

*   Obtain the correct MongoDB connection string and update the `backend/.env` file.
*   Restart the backend server.
