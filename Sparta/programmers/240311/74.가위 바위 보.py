def solution(rsp):
    arr = list(rsp)
    for i in range(len(arr)):
        if arr[i] == '0':
            arr[i] = '5'

        elif arr[i] == '2':
            arr[i] = '0'
        else:
            arr[i] = '2'
    return ''.join(arr)
