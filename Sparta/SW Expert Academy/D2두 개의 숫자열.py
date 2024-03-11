t = int(input())

for ind in range(t):
    n, m = list(map(int, input().split()))
    a = list(map(int, input().split()))
    b = list(map(int, input().split()))

    diff = abs(n-m)

    if n > m:
        a, b = b, a
        n, m = m, n

    max = 0
    for offset in range(diff+1):
        sum = 0

        for i in range(n):
            sum += a[i]*b[i + offset]

        if max < sum:
            max = sum
    print(f'#{ind+1} {max}')
