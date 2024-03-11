import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const __dirname = path.resolve();

app.set('port',process.env.PORT||3000)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//     resave:false,
//     saveUninitialized:false,
//     secret:process.env.COOKIE_SECRET,
//     cookie:{
//         httpOnly:true,
//         secure:false
//     },
//     name:'session-cookie'
// }));
app.use('/',express.static(path.join(__dirname,'public')))



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
const server = createServer(app);

server.listen(app.get('port'),()=>{
    console.log('server running at http://127.0.0.1:3000');
})

