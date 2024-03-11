def solution(array, height):
    count = 0
    for i in array:
        if height < i:
            count += 1
    return count
