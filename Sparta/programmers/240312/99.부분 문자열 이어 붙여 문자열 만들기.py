def solution(my_strings, parts):
    res = []
    for i in range(len(my_strings)):
        my_strings[i] = list(my_strings[i])
        res.append(''.join(my_strings[i][parts[i][0]:parts[i][1]+1]))
    return ''.join(res)
