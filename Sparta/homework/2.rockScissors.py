import random

game = ['가위', '바위', '보']
restart = 'y'
reset = 'n'
win = 0
lose = 0
draw = 0


def start_game():
    computer = game[random.randint(0, 2)]
    user = input('"가위" "바위" "보"중에 하나를 입력해주세요 : ')
    global win, lose, draw
    if user == '가위':
        if computer == '가위':

            print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다')
            draw += 1
        elif computer == '바위':
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
            lose += 1
        else:
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
            win += 1
    elif user == '바위':
        if computer == '가위':
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
            win += 1
        elif computer == '바위':
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다.')
            draw += 1
        else:
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
            lose += 1
    elif user == '보':
        if computer == '가위':
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
            lose += 1
        elif computer == '바위':
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
            win += 1
        else:
            print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다.')
            draw += 1
    else:
        print('유효한 입력이 아닙니다.')
        start_game()


def reset_scores():
    global win, lose, draw
    win = 0
    lose = 0
    draw = 0
    print('전적을 초기화 하였습니다.')


def show_score():
    global win, lose, draw
    print(f'승: {win} 무: {draw} 패: {lose}')


while restart == 'y':
    start_game()

    restart = input('다시 도전 하시겠습니까? (y/n):').lower()
    while restart != 'y' and restart != 'n':
        restart = input('유효한 입력이 아닙니다.\n다시 도전 하시겠습니까? (y/n):').lower()

    if restart == 'y':
        reset = input('전적을 초기화 하시겠습니까? (y/n):').lower()
        while reset != 'y' and reset != 'n':
            reset = input('유효한 입력이 아닙니다.\n전적을 초기화 하시겠습니까? (y/n):').lower()

        if reset == 'y':
            show_score()
            reset_scores()

show_score()
