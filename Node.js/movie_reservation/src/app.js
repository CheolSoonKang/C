/*specification */
/*Used OpenAPI */
/*영화진흥위원회 open api*/
/*한국영화데이터베이스 open api*/
/*도로명주소 open api */
/*need to install modules(express , express-session , cookie-parser 
socket.io , mysql2,nodemon,pm2) */
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';
import { router } from './routers.js';
import socketIOServer from './socket.js';
dotenv.config();

const secretCryptokey = 'thisIsMyNodeJSFirstApp';
function hashingPasswordSha256(password) {
    return crypto
        .createHmac('sha256', secretCryptokey)
        .update(password)
        .digest('hex');
}

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

export const sessionConfig = session({
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
app.use('/', router);
/////////////////////////////////////////////////////////////////////

const server = createServer(app);

server.listen(app.get('port'), () => {
    console.log('server running at http://127.0.0.1:3000');
});

socketIOServer(server);
