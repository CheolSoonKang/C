const id = document.getElementById('id');
const idCheck = document.getElementById('idcheck');
const password = document.getElementById('password');
const passwordCheck = document.getElementById('passwordcheck');
const name = document.getElementById('name');
const roadAddrPart1 = document.getElementById('roadAddrPart1');
const zipNo = document.getElementById('zipNo');
const addrDetail = document.getElementById('addrDetail');
const submitBtn = document.getElementById('submitBtn');
const socket = io();

let pwCheckFlag = false;
let idCheckFlag = false;

id.addEventListener('focus', () => {
    id.value = '';
    idCheckFlag = false;
});
idCheck.addEventListener('click', () => {
    if (id.value) {
        fetch('/moviereservation/idCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: id.value,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.result == '1') {
                    idCheckFlag = true;
                    alert('사용 가능한 아이디 입니다');
                } else {
                    id.value = '';
                    alert('이미 사용중인 아이디입니다.');
                }
            });
    } else {
        alert('아이디를 입력해주세요.');
    }
});
password.addEventListener('focus', () => {
    pwCheckFlag = false;
    password.value = '';
});
passwordCheck.addEventListener('focus', () => {
    pwCheckFlag = false;
});

submitBtn.addEventListener('click', () => {
    const specialRule = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (password.value === passwordCheck.value) {
        pwCheckFlag = true;
    }
    if (idCheckFlag == false) {
        alert('아이디 중복 확인을 해주세요');
    }
    if (password.value !== passwordCheck.value) {
        alert('비밀번호가 일치하지 않습니다.');
    } else if (!specialRule.test(password.value)) {
        password.focus();
        alert('비밀번호에 특수 문자를 포함해주세요');
    } else if (
        id.value &&
        password.value &&
        name.value &&
        roadAddrPart1.value &&
        zipNo.value &&
        addrDetail.value &&
        pwCheckFlag &&
        idCheckFlag
    ) {
        fetch('/moviereservation/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: id.value,
                password: password.value,
                name: name.value,
                address: `${roadAddrPart1.value}(${zipNo.value}) ${addrDetail.value}`,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then(({ result }) => {
                if (result == '1') {
                    //success to signUp
                    window.location = '/moviereservation';
                    alert('회원가입이 완료되었습니다.');
                } else {
                    window.location = '/moviereservation/signup';
                    alert(
                        '알 수 없는 오류로 인해 회원가입되지 않았습니다\n처음부터 다시 시도해주세요.'
                    );
                }
            });
    } else if (
        !id.value ||
        !password.value ||
        !name.value ||
        !roadAddrPart1.value ||
        !zipNo.value ||
        !addrDetail.value
    ) {
        alert('정보를 모두 입력해주세요');
    }
});
//////////////////////////////////
//도로명 주소
function goPopup() {
    var pop = window.open(
        '/moviereservation/popup/jusoPopup',
        'pop',
        'width=570,height=420, scrollbars=yes, resizable=yes'
    );
}
function jusoCallBack(
    roadFullAddr,
    roadAddrPart1,
    addrDetail,
    roadAddrPart2,
    engAddr,
    jibunAddr,
    zipNo,
    admCd,
    rnMgtSn,
    bdMgtSn,
    detBdNmList,
    bdNm,
    bdKdcd,
    siNm,
    sggNm,
    emdNm,
    liNm,
    rn,
    udrtYn,
    buldMnnm,
    buldSlno,
    mtYn,
    lnbrMnnm,
    lnbrSlno,
    emdNo
) {
    // 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다
    console.log(roadAddrPart1);
    document.getElementById('roadAddrPart1').value = roadAddrPart1;
    document.getElementById('addrDetail').value = addrDetail;
    document.getElementById('zipNo').value = zipNo;

    // doro.value = roadAddrPart1;
    // addr.value = addrDetail;
    // zip.value = zipNo;
}
