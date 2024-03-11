def solution(sides):
    a = max(sides)
    sides.remove(a)
    b = sum(sides)
    return 1 if a < b else 2
