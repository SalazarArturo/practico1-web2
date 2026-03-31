import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.route.js';


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', authRouter);


app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is running on port: ${process.env.APP_PORT}`);
});