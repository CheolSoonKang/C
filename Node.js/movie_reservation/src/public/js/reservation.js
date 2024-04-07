// if (islogged != 'true') {
//     alert('로그인 먼저 해주세요.');
//     window.location = '/moviereservation';
// }
const socket = io();
const theaterSelect = document.getElementById('theater');
const contents = document.getElementById('contents');
const radioDiv = document.getElementById('radioDiv');

//html태그의 class가 enable이 있는 좌석은 클릭 시 아래의 함수가 실행된다.
//선택한 좌석을 예매할 수 있도록 동시 예매 수에 따라 서버로 좌석정보를 보내준다.
const onClickSeat = (event) => {
    const target = event.target;
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');
    const yellowElements = document.querySelectorAll('.hover');
    const selectedRadioValue = document.querySelector(
        'input[name="attendance"]:checked'
    ).value;
    if (yellowElements.length != selectedRadioValue) {
        alert('선택하신 좌석 중에 이미 예약이 완료된 좌석이 있습니다.');
    } else {
        if (confirm('예약하시겠습니까?')) {
            let x_list = [],
                y_list = [];
            yellowElements.forEach((selectedSeat) => {
                const x = selectedSeat.getAttribute('data-x');
                const y = selectedSeat.getAttribute('data-y');
                document
                    .querySelector(`[data-x='${x}'][data-y='${y}']`)
                    .classList.remove('enable');
                x_list.push(x);
                y_list.push(y);
            });
            socket.emit('reserve', {
                x_list: x_list,
                y_list: y_list,
                theaterNumber:
                    theaterSelect.options[theaterSelect.selectedIndex].value,
            });
        } else {
            alert('예약이 취소되었습니다.');
        }
    }
};
//선택한 좌석의 태그를 반환한다.
//i의 값에 따라 선택한 좌석의 왼쪽 혹은 오른쪽 좌석의 태그도 반환 가능
const getSeatElement = (x, y, i) => {
    const element = document.querySelector(
        `[data-x="${Number(x) + i}"][data-y='${y}']`
    );
    return element;
};
//마우스를 좌석 위에 올려놓았을 때 이벤트 처리함수로 마우스를 올려놓았을 때,
//동시 예매수에 따라 선택한 좌석의 html태그의 class를 변경하여 색을 다르게 보여주는 역할을 한다.,
//아래의 onLeave()함수는 onHover()함수와 정반대의 역할로 마우스를 좌석 위에서 벗어날 때,
//원래 좌석 색으로 돌려놓을 수 있게,html태그의 class를 변경한다.
const onHover = (event) => {
    const target = event.target; //사용자가 올려놓은 해당 좌석
    const targetPosition = target.className.split(' ')[1]; //leftSide, middole, rightSide가 있다.
    //동시 예매하고자 하는 수를 가져온다.
    const selectedRadioValue = document.querySelector(
        'input[name="attendance"]:checked'
    ).value;

    //마우스를 올려놓은 좌석의 x,y값을 받아온다.
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');

    //동시 예매하고자 하는 수에 따라 다른 동작
    switch (selectedRadioValue) {
        case '1': //해당 좌석만 enable class를 삭제하고 hover class 추가해준다.
            target.classList.remove('enable');
            target.classList.add('hover');
            break;
        case '2': //동시 예매 수가 두 명일 때
            if (targetPosition != 'rightSide') {
                //선택한 좌석이 오른쪽 끝 쪽을 제외한 모든 좌석
                if (getSeatElement(x, y, 1).className == 'seat middle aisle') {
                    //선택한 좌석의 우측이 복도인가?
                    for (let i = 0; i <= selectedRadioValue; i += 2) {
                        //그렇다면 복도를 건너 뛴 한 칸 옆을 선택
                        const onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'enable') {
                            onHoverTarget.classList.remove('enable');
                            onHoverTarget.classList.add('hover');
                        }
                    }
                } else {
                    //선택한 좌석의 우측이 복도가 아닐 때
                    for (let i = 0; i < selectedRadioValue; i++) {
                        //해당 좌석과 바로 우측 좌석을 선택
                        const onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'enable') {
                            onHoverTarget.classList.remove('enable');
                            onHoverTarget.classList.add('hover');
                        }
                    }
                }
            } else {
                //선택한 좌석이 우측 끝일 때
                for (let i = 0; i < selectedRadioValue; i++) {
                    //선택한 좌석의 좌측 좌석을 선택
                    const onHoverTarget = getSeatElement(x, y, -i);
                    if (onHoverTarget.className.split(' ')[2] == 'enable') {
                        onHoverTarget.classList.remove('enable');
                        onHoverTarget.classList.add('hover');
                    }
                }
            }
            break;
        case '3': //동시 예매가 세 명일 때
            if (targetPosition == 'leftSide') {
                //선택한 좌석이 좌측 끝일 때
                let offset = 0;
                for (let i = 0; i < selectedRadioValue; i++) {
                    let onHoverTarget = getSeatElement(x, y, i);
                    //해당 좌석이 복도인가?
                    if (onHoverTarget.className == 'seat middle aisle') {
                        //그렇다면, 한 칸 건너뛴 우측 좌석을 선택할 수 있게 offset을 1 올린다.
                        offset++;
                    }
                    onHoverTarget = getSeatElement(x, y, i + offset);
                    if (onHoverTarget.className.split(' ')[2] == 'enable') {
                        onHoverTarget.classList.remove('enable');
                        onHoverTarget.classList.add('hover');
                    }
                }
            } else if (targetPosition == 'rightSide') {
                //선택한 좌석이 우측 끝일 때
                let offset = 0;
                for (let i = 0; i > -selectedRadioValue; i--) {
                    let onHoverTarget = getSeatElement(x, y, i);
                    //해당 좌석이 복도인가?
                    if (onHoverTarget.className == 'seat middle aisle') {
                        //그렇다면, 한 칸 건너뛴 좌측 좌석을 선택할 수 있게 offset을 1 올린다.
                        offset--;
                    }
                    onHoverTarget = getSeatElement(x, y, i + offset);
                    if (onHoverTarget.className.split(' ')[2] == 'enable') {
                        onHoverTarget.classList.remove('enable');
                        onHoverTarget.classList.add('hover');
                    }
                }
            } else {
                //선택한 좌석이 우측 끝도 ,좌측 끝도 아닐 경우
                if (getSeatElement(x, y, 1).className == 'seat middle aisle') {
                    //선택한 좌석의 우측이 복도인가?
                    let offset = 0;
                    for (let i = -1; i < selectedRadioValue - 1; i++) {
                        //그렇다면,선택한 좌석의 한 칸 좌측부터 세 칸(복도를 제외한)을 선택한다.
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className == 'seat middle aisle') {
                            offset++;
                        }
                        onHoverTarget = getSeatElement(x, y, i + offset);
                        if (onHoverTarget.className.split(' ')[2] == 'enable') {
                            onHoverTarget.classList.remove('enable');
                            onHoverTarget.classList.add('hover');
                        }
                    }
                } else if (
                    getSeatElement(x, y, -1).className == 'seat middle aisle' ////선택한 좌석의 좌측이 복도인가?
                ) {
                    let offset = 0;
                    for (let i = -2; i < selectedRadioValue - 2; i++) {
                        //그렇다면,선택한 좌석의 두 칸 좌측부터 세 칸(복도를 제외한)을 선택한다.
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className == 'seat middle aisle') {
                            offset++;
                        }
                        onHoverTarget = getSeatElement(x, y, i + offset);
                        if (onHoverTarget.className.split(' ')[2] == 'enable') {
                            onHoverTarget.classList.remove('enable');
                            onHoverTarget.classList.add('hover');
                        }
                    }
                } else {
                    //선택한 좌석의 좌 측도,우 측도 복도가 아니라면
                    //선택한 좌석의 좌 측서부터 세 칸을 선택한다.
                    for (let i = -1; i < selectedRadioValue - 1; i++) {
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'enable') {
                            onHoverTarget.classList.remove('enable');
                            onHoverTarget.classList.add('hover');
                        }
                    }
                }
            }
            break;
    }
};
//마우스가 좌석에서 벋어날 때
const onLeave = (event) => {
    const target = event.target;
    const targetPosition = target.className.split(' ')[1];
    const selectedRadioValue = document.querySelector(
        'input[name="attendance"]:checked'
    ).value;
    const x = target.getAttribute('data-x');
    const y = target.getAttribute('data-y');
    switch (selectedRadioValue) {
        case '1':
            target.classList.remove('hover');
            target.classList.add('enable');
            break;
        case '2':
            if (targetPosition != 'rightSide') {
                if (getSeatElement(x, y, 1).className == 'seat middle aisle') {
                    for (let i = 0; i <= selectedRadioValue; i += 2) {
                        const onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'hover') {
                            onHoverTarget.classList.remove('hover');
                            onHoverTarget.classList.add('enable');
                        }
                    }
                } else {
                    for (let i = 0; i < selectedRadioValue; i++) {
                        const onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'hover') {
                            onHoverTarget.classList.remove('hover');
                            onHoverTarget.classList.add('enable');
                        }
                    }
                }
            } else {
                for (let i = 0; i < selectedRadioValue; i++) {
                    const onHoverTarget = getSeatElement(x, y, -i);
                    if (onHoverTarget.className.split(' ')[2] == 'hover') {
                        onHoverTarget.classList.remove('hover');
                        onHoverTarget.classList.add('enable');
                    }
                }
            }
            break;
        case '3':
            if (targetPosition == 'leftSide') {
                let j = 0;

                for (let i = 0; i < selectedRadioValue; i++) {
                    let onHoverTarget = getSeatElement(x, y, i);
                    if (onHoverTarget.className == 'seat middle aisle') {
                        j++;
                    }
                    onHoverTarget = getSeatElement(x, y, i + j);
                    if (onHoverTarget.className.split(' ')[2] == 'hover') {
                        onHoverTarget.classList.remove('hover');
                        onHoverTarget.classList.add('enable');
                    }
                }
            } else if (targetPosition == 'rightSide') {
                let j = 0;
                for (let i = 0; i > -selectedRadioValue; i--) {
                    let onHoverTarget = getSeatElement(x, y, i);
                    if (onHoverTarget.className == 'seat middle aisle') {
                        j--;
                    }
                    onHoverTarget = getSeatElement(x, y, i + j);
                    if (onHoverTarget.className.split(' ')[2] == 'hover') {
                        onHoverTarget.classList.remove('hover');
                        onHoverTarget.classList.add('enable');
                    }
                }
            } else {
                if (getSeatElement(x, y, 1).className == 'seat middle aisle') {
                    let offset = 0;
                    for (let i = -1; i < selectedRadioValue - 1; i++) {
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className == 'seat middle aisle') {
                            offset++;
                        }
                        onHoverTarget = getSeatElement(x, y, i + offset);
                        if (onHoverTarget.className.split(' ')[2] == 'hover') {
                            onHoverTarget.classList.remove('hover');
                            onHoverTarget.classList.add('enable');
                        }
                    }
                } else if (
                    getSeatElement(x, y, -1).className == 'seat middle aisle'
                ) {
                    let offset = 0;
                    for (let i = -2; i < selectedRadioValue - 2; i++) {
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className == 'seat middle aisle') {
                            offset++;
                        }
                        onHoverTarget = getSeatElement(x, y, i + offset);
                        if (onHoverTarget.className.split(' ')[2] == 'hover') {
                            onHoverTarget.classList.remove('hover');
                            onHoverTarget.classList.add('enable');
                        }
                    }
                } else {
                    for (let i = -1; i < selectedRadioValue - 1; i++) {
                        let onHoverTarget = getSeatElement(x, y, i);
                        if (onHoverTarget.className.split(' ')[2] == 'hover') {
                            onHoverTarget.classList.remove('hover');
                            onHoverTarget.classList.add('enable');
                        }
                    }
                }
            }
            break;
    }
};

//영화관의 수만큼 select태그에 option태그를 추가해준다.
for (let i = 1; i <= Number(theaters); i++) {
    const theater = document.createElement('option');
    theater.text = ` ${i}관 `;
    theater.value = `${i}`;
    theaterSelect.appendChild(theater);
}
//이 영화관은 최대 3명까지 동시 예매 가능하다.
//이를 위해 input태그의 radio타입을 이용한다.
for (let i = 1; i <= 3; i++) {
    const radio = document.createElement('input');
    const label = document.createElement('label');

    if (i == 3) {
        radio.checked = true;
    }
    radio.type = 'radio';
    radio.name = 'attendance';
    radio.value = i;
    radio.id = i;
    label.htmlFor = radio.id;
    label.innerText = `${i}명 `;

    radioDiv.appendChild(radio);
    radioDiv.appendChild(label);
}
//영화관이 변경되면 서버로부터 다시 좌석정보를 얻어온다.
theaterSelect.addEventListener('change', () => {
    getSeats(theaterSelect.options[theaterSelect.selectedIndex].value);
});
//선택한 영화관의 번호에 따라 좌석 받아와 배치한다.
const getSeats = (theaterNumber) => {
    fetch(`/moviereservation/seats/${theaterNumber}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            contents.innerHTML = '';
            data.forEach((lines, indexY) => {
                const line = document.createElement('div');
                line.classList.add('line');

                lines.forEach((seat, indexX) => {
                    const div = document.createElement('div');
                    div.classList.add('seat');
                    div.setAttribute('data-x', indexX);
                    div.setAttribute('data-y', indexY);
                    div.style.textAlign = 'center';
                    line.append(div);
                    if (indexX == 0) {
                        div.classList.add('leftSide');
                    }
                    if (lines.length - 1 == indexX) {
                        div.classList.add('rightSide');
                    }
                    if (indexX > 0 && indexX < lines.length - 1) {
                        div.classList.add('middle');
                    }
                    if (seat == 1) {
                        div.classList.add('enable');
                        div.innerText = `${String.fromCharCode(
                            65 + indexY
                        )}${indexX}`;
                        div.addEventListener('click', onClickSeat);
                        div.addEventListener('mouseenter', onHover);
                        div.addEventListener('mouseleave', onLeave);
                    } else if (seat == 2) {
                        div.classList.add('disable');
                        div.innerText = `${String.fromCharCode(
                            65 + indexY
                        )}${indexX}`;
                    } else {
                        div.classList.add('aisle');
                    }
                });
                contents.append(line);
            });
        });
};
// 기본적으로 1관의 정보를 받아온다.
getSeats(1);
socket.on('reservationFail', ({ failValue }) => {
    alert('로그인 정보가 올바르지 않습니다.\n다시 로그인 해주세요');
});
//나를 포함한 모든 접속자의 좌석 현황을 변경한다.
socket.on('reserve', ({ x_list, y_list, theaterNumber }) => {
    if (
        theaterSelect.options[theaterSelect.selectedIndex].value ==
        theaterNumber
    ) {
        for (let i = 0; i < x_list.length; i++) {
            const target = document.querySelector(
                `[data-x="${x_list[i]}"][data-y='${y_list[i]}']`
            );
            target.removeEventListener('click', onClickSeat);
            target.classList.remove('hover');
            target.removeEventListener('mouseenter', onHover);
            target.removeEventListener('mouseleave', onLeave);
            target.classList.remove('enable');
            target.classList.add('disable');
        }
    }
});
socket.on('reservationSuccess', ({ successValue }) => {
    window.location = '/moviereservation';
});
