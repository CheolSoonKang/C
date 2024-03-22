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
import mysql from 'mysql2';
import { assert } from 'console';
import mysqlConfig from '../mysql.json' assert { type: 'json' };
import crypto from 'crypto';
import { Server } from 'socket.io';

const secretCryptokey = 'thisIsMyNodeJSFirstApp';
function hashingPasswordSha256(password) {
    return crypto
        .createHmac('sha256', secretCryptokey)
        .update(password)
        .digest('hex');
}
let seats = {
    '1관': [
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '2관': [
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '3관': [
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '4관': [
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
};

const conn = mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
});

conn.connect();
dotenv.config();

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
app.use('/', express.static(path.join(__dirname, '/src/public')));

/////////////////////////////////////////////////////////////////////
let receivedDailyBoxOfficeList = {};
let moviePosterUrl = {};
let movieUrls = {};
const getDailyBoxOfficeList = () => {
    receivedDailyBoxOfficeList = {};
    moviePosterUrl = {};
    const date = new Date();
    const dateQuery = `${date.getFullYear()}${String(
        date.getMonth() + 1
    ).padStart(2, '0')}${String(date.getDate() - 1).padStart(2, '0')}`;

    const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${dateQuery}`;
    fetch(apiUrl)
        .then((result) => {
            return result.json();
        })
        .then(({ boxOfficeResult: { dailyBoxOfficeList } }) => {
            receivedDailyBoxOfficeList = dailyBoxOfficeList;
            dailyBoxOfficeList.forEach((item) => {
                const movieName = item.movieNm;
                const kmdbServiceKey = `B2BZ9B5BHJ64RPLX1IY4`;
                const kmdbMovieApi = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=${movieName}&ServiceKey=${kmdbServiceKey}`;

                fetch(kmdbMovieApi)
                    .then((result) => {
                        return result.json();
                    })
                    .then((datas) => {
                        const splited = datas.Data[0].Result[0].posters
                            ? datas.Data[0].Result[0].posters.split('|')
                            : datas.Data[0].Result[1].posters.split('|');
                        moviePosterUrl[movieName] = splited[0];

                        movieUrls[movieName] = datas.Data[0].Result[0].posters
                            ? datas.Data[0].Result[0].kmdbUrl
                            : datas.Data[0].Result[1].kmdbUrl;
                    });
            });
            console.log('getApis done');
        });
};
getDailyBoxOfficeList();
setInterval(getDailyBoxOfficeList, 3600 * 24 * 1000);
app.post('/seats/:theaterNumber', (req, res) => {
    const {
        params: { theaterNumber },
    } = req;

    res.send(seats[`${Number(theaterNumber)}관`]);
});
app.get('/reservation', (req, res) => {
    res.render('reservation', {
        islogged: req.session.islogged,
        theaters: Object.keys(seats).length,
    });
});
app.get('/', (req, res) => {
    if (!req.session.islogged) {
        req.session.islogged = false;
    }
    console.dir(req.session);
    const data = {
        receivedDailyBoxOfficeList: JSON.stringify(receivedDailyBoxOfficeList),
        moviePosterUrl: JSON.stringify(moviePosterUrl),
        movieUrls: JSON.stringify(movieUrls),
    };
    res.render(`index`, { data: data, islogged: req.session.islogged });
});
/////////////////////////////////////////////////////////////////////
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login', { islogged: 'not yet' });
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.post('/loginCheck', (req, res) => {
    const { id, password } = req.body;
    console.log(`id:${id} password:${password}`);
    conn.query(`select * from user where email='${id}'`, (err, result) => {
        let flag = '0';
        if (
            result.length &&
            result[0].password == hashingPasswordSha256(password)
        ) {
            console.log('im here');
            req.session.ids = id;
            req.session.islogged = true;
            flag = '1';
        }
        res.json({ loginResult: flag });
    });
});

//for 주소를 받아오기 위한 도로명주소api////////////////////////////////////////
app.get('/popup/jusoPopup', (req, res) => {
    res.render('jusoPopup');
});
app.post('/popup/jusoPopup', (req, res) => {
    // 새로 추가
    console.log(req.body);
    res.render('jusoPopup', { locals: req.body });
});
/////////////////////////////////////////////////
app.get('/movies/:movieName', (req, res) => {
    const {
        params: { movieName },
    } = req;
    res.send(`${movieName}`);
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
