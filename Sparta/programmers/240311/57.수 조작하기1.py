def solution(n, control):
    n += control.count('w')
    n -= control.count('s')
    n += control.count('d')*10
    n -= control.count('a')*10
    return n
