import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // to perform crud operations on cookies present on user's browser

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"})) // to accept json
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());


// routes import

import userRouter from "./routes/user.routes.js"



// routes declaration

app.use("/api/v1/users", userRouter)

export { app };