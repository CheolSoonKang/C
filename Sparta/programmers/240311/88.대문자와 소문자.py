def solution(my_string):
    my_string = list(my_string)
    for i in range(len(my_string)):
        if my_string[i].isupper():
            my_string[i] = my_string[i].lower()
        else:
            my_string[i] = my_string[i].upper()

    return ''.join(my_string)
