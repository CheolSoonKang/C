/*specification */
/*Used OpenAPI */
/*영화진흥위원회 open api*/
/*한국영화데이터베이스 open api*/
/*도로명주소 open api */
import express from 'express';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';
import { Server } from 'socket.io';
import { router, seats } from './routers.js';
import conn from './db.js';
dotenv.config();

const secretCryptokey = 'thisIsMyNodeJSFirstApp';
function hashingPasswordSha256(password) {
    return crypto
        .createHmac('sha256', secretCryptokey)
        .update(password)
        .digest('hex');
}

console.log('process:' + process.env.DB_HOST);
const app = express();
const __dirname = path.resolve();
//////////////////////////////////////////////
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './src/public/view');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

const sessionConfig = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
});
app.use(sessionConfig);
app.use('/', express.static(path.join(__dirname, './src/public')));
app.use('/moviereservation', router);
/////////////////////////////////////////////////////////////////////

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
    socket.on('reserve', ({ x_list, y_list, theaterNumber }) => {
        for (let i = 0; i < x_list.length; i++) {
            seats[`${theaterNumber}관`][y_list[i]][x_list[i]] = 2;
        }
        io.sockets.emit('reserve', {
            x_list: x_list,
            y_list: y_list,
            theaterNumber: theaterNumber,
        });
    });
});
