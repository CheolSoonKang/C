def solution(numbers, n):
    if numbers[0] > n:
        return numbers[0]
    numbers[1] += numbers[0]

    return solution(numbers[1:], n)
