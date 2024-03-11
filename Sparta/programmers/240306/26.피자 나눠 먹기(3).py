def solution(slice, n):
    if slice > n:
        return 1

    return n//slice if n % slice == 0 else n//slice + 1
