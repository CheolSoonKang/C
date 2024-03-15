import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import mysql from 'mysql2';
import mysqlConfig from '../mysql.json' assert { type: 'json' };
import crypto from 'crypto';
import { Server } from 'socket.io';
import { assert } from 'console';

const secretCryptokey = 'thisIsMyNodeJSFirstApp';
function hashingPasswordSha256(password) {
    return crypto
        .createHmac('sha256', secretCryptokey)
        .update(password)
        .digest('hex');
}

const conn = mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
});
conn.connect();

const app = express();
const __dirname = path.resolve();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './src/public/view');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());
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
app.use('/', express.static(path.join(__dirname, '/src/public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.send('로그인 페이지입니다.');
});

app.get('/popup/jusoPopup', (req, res) => {
    res.render('jusoPopup');
});

app.post('/popup/jusoPopup', (req, res) => {
    // 새로 추가
    console.log(req.body);
    res.render('jusoPopup', { locals: req.body });
});

const server = createServer(app);

server.listen(app.get('port'), () => {
    console.log('server running at http://127.0.0.1:3000');
});

const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('idCheck', ({ email }) => {
        conn.query(`select * from user where email='${email}'`, (err, res) => {
            console.log(res.length);
            let flag = '0';

            if (res.length === 0) {
                flag = '1';
            }
            console.log(flag);
            socket.emit('idCheckResult', { result: flag });
        });
    });
    socket.on('signUp', ({ email, password, name, address }) => {
        console.log(email);
        console.log(hashingPasswordSha256(password));
        console.log(name);
        console.log(address);
        conn.query(
            `insert into user(email,password,name,address)values("${email}","${hashingPasswordSha256(
                password
            )}","${name}","${address}");`,
            (err, res) => {
                let flag = '0';
                if (err == null) {
                    // success to signUp
                    flag = '1';
                }
                socket.emit('signUpResult', { result: flag });
            }
        );
    });
});
