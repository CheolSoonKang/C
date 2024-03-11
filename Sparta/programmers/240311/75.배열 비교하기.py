def solution(arr1, arr2):
    result = 0
    if len(arr1) < len(arr2):
        result = -1
    elif len(arr1) > len(arr2):
        result = 1
    else:
        if sum(arr1) > sum(arr2):
            result = 1
        elif sum(arr1) < sum(arr2):
            result = -1
        else:
            reuslt = 0

    return result
