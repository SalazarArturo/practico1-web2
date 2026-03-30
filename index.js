import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import initRouter from './routes/login-route.js';
import newUserRoute from './routes/new-user/new-user-form-route.js';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', initRouter);
app.use('/register', newUserRoute);

app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port: ${process.env.APP_PORT}`);
});