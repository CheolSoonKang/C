def solution(n):
    sum = 0

    while n//10:
        sum += n % 10
        n //= 10
    sum += n
    return sum
