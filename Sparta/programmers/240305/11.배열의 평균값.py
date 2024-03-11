def solution(numbers):
    avg = sum(numbers)/len(numbers) - sum(numbers)//len(numbers)
    if not avg == 0:
        avg = 0.5
    return sum(numbers)//len(numbers)+avg
