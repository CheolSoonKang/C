def solution(arr):
    x = []
    for i in arr:
        for index in range(i):
            x.append(i)
    return x
