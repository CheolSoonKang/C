def solution(my_string):
    summ = 0
    for i in my_string:
        if i.isdigit():
            summ += int(i)

    return summ
