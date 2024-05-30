T = int(input())

a, b, c = 0, 0, 0

if not T % 10:
    a = int(T/300)
    b = int((T % 300)/60)
    c = int((T % 60)/10)
    print(f'{a} {b} {c}')
else:
    print("-1")
