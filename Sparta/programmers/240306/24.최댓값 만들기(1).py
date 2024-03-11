def solution(numbers):
    numbers.sort()
    return numbers[len(numbers)-1]*numbers[len(numbers)-2]
