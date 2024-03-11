def solution(n):
    return len([[i, n // i] for i in range(1, n + 1) if not n % i])
