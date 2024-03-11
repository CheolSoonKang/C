def solution(n, numlist):
    result = []
    for element in numlist:
        if element % n == 0:
            result.append(element)
    return result
