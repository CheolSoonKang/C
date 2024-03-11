def solution(array, n):
    count = 0
    for ele in array:
        if n == ele:
            count += 1
    return count
