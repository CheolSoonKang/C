import { Server } from 'socket.io';
import conn from './db.js';
import { seats, getUserNumberByEmail } from './routers.js';
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
        socket.on('reserve', async ({ x_list, y_list, theaterNumber }) => {
            if (socket.handshake.session.userName) {
                const userTableName = `${
                    socket.handshake.session.userName
                }_${await getUserNumberByEmail(
                    socket.handshake.session.email
                )}_history`;

                // A열 1,2,3
                let seatInfo = `${String.fromCharCode(
                    65 + Number(y_list[0])
                )}열`;
                seatInfo += x_list.join(',');
                console.log(seatInfo);

                for (let i = 0; i < x_list.length; i++) {
                    seats[`${theaterNumber}관`][y_list[i]][x_list[i]] = 2;
                    conn.query(
                        `update theaters set seats=JSON_SET(seats,'$[${y_list[i]}][${x_list[i]}]',2) where id="${theaterNumber}"`,
                        (err, data) => {
                            console.log(`err:${err}`);
                        }
                    );
                }
                conn.query(
                    `insert into ${userTableName}(reserved_seats)values("${seatInfo}");`,
                    (err, data) => {
                        console.log(`errSeats: ${err}`);
                        console.log(`dataSeats: ${data}`);
                    }
                );

                //for broadcast
                SIS.sockets.emit('reserve', {
                    x_list: x_list,
                    y_list: y_list,
                    theaterNumber: theaterNumber,
                });
                socket.emit('reservationSuccess', {
                    successValue: '1',
                });
            } else {
                socket.emit('reservationFail', {
                    failValue: '1',
                });
            }
        });
    });
}
