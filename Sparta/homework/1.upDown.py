import random

random_num = random.randint(1, 100)
restart = 'y'
predic_num = 0
restart_count = 0
maximum_count = 0
count = 0

while random_num != predic_num and restart == 'y':
    # show last score
    if maximum_count != 0 and restart_count == 0:
        print(f'이전 게임 플레이어 최고 시도 점수 : {maximum_count}')
        restart_count = 1

    # enter prediction number
    predic_num = input('1 ~ 100 사이 숫자를 맞춰보세요 : ')

    try:  # user entered integer, and consverts type str to int
        predic_num = int(predic_num)
    except :  # user entered something other
        print('자연수를 입력해주세요 (1 ~ 100)')
        print('')
        continue

    if 1 <= predic_num <= 100:  # user enter 1 ~ 100 integer
        if random_num < predic_num:  # predic_num bigger than random number
            print('다운')
            count += 1
        elif random_num > predic_num:  # predic_num smaller than random number
            print('업')
            count += 1
        else:  # prediction is correct
            count += 1
            print(f'맞았습니다.\n 시도한 횟수 : {count}')
            maximum_count = count
            count = 0

            # check regame (y or n)
            restart = input('다시 하시겠습니까? (y/n):')
            while restart != 'y' and restart != 'n':  # user entered something other
                restart = input('다시 하시겠습니까? (y/n):')

            # change random_number and restart_count
            random_num = random.randint(1, 100)
            restart_count = 0
    else:  # user enter bigger than 100 or smaller than 1
        print('1 ~ 100사이 자연수를 입력해주세요.')
        print('')
