import { Server } from 'socket.io';
import conn from './db.js';
import { seats } from './routers.js';
import sharedSession from 'express-socket.io-session';
import { sessionConfig } from './app.js';
export default function socketIOServer(app) {
    const SIS = new Server(app);
    SIS.use(sharedSession(sessionConfig), {
        autoSave: true,
    });
    SIS.on('connection', (socket) => {
        socket.on('reqSessionCheck', ({ data }) => {
            const {
                handshake: {
                    session: { isAdmin },
                },
            } = socket;
            console.log(isAdmin);
        });
        socket.on('reserve', ({ x_list, y_list, theaterNumber }) => {
            if (socket.handshake.session.userName) {
                for (let i = 0; i < x_list.length; i++) {
                    seats[`${theaterNumber}관`][y_list[i]][x_list[i]] = 2;
                    conn.query(
                        `update theaters set seats=JSON_SET(seats,'$[${y_list[i]}][${x_list[i]}]',2) where id="${theaterNumber}"`,
                        (err, data) => {
                            console.log(`err:${err}`);
                        }
                    );
                }
                SIS.sockets.emit('reserve', {
                    x_list: x_list,
                    y_list: y_list,
                    theaterNumber: theaterNumber,
                });
                socket.emit('reservationSuccess', {
                    successValue: '1',
                });
                const date = new Date();
                const dateQuery = `${date.getFullYear()}-${String(
                    // fitting format YYYY-MM-DD
                    date.getMonth() + 1 //왜인지는 모르겠지만,getMonth()는 +1 해줘야 한다.
                ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                console.log(dateQuery);
                // conn.query(
                //     `insert into user(reservation_history)values('{"${dateQuery}":{"${x_list},${y_list}"}}')where name="${socket.handshake.session.email}"`,
                //     (err, data) => {
                //         console.log(err);
                //     }
                // );
            } else {
                socket.emit('reservationFail', {
                    failValue: '1',
                });
            }
        });
    });
}
