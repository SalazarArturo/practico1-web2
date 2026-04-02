import express from 'express';
import 'dotenv/config';
import session from 'express-session';
import bodyParser from 'body-parser';

import { sequelize } from './models/index.js';

import clientRouter from './routes/client.route.js';
import authRouter from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET_WORD,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use('/', authRouter);
app.use('/user', userRoute);
app.use('/cliente', clientRouter);

async function startServer() {
    try {
        await sequelize.sync();
        console.log('db resync');
        app.listen(process.env.APP_PORT, () => {
            console.log(`server is running on port: ${process.env.APP_PORT}`);
        });
    } catch (error) {
        console.error(`Error al arrancar: ${error}`);
    }
}

startServer();
