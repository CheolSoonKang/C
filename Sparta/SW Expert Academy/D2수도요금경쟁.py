t = int(input())

for _ in range(t):
    p, q, r, s, w = map(int, input().split())

    a = p*w
    b = q if w < r else s*(w-r) + q
    print(min(a, b))
