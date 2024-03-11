t = int(input())

for _ in range(t):

    n, m = map(int, input().split())

    arr = []
    for i in range(n):
        arr.append(list(map(int, input().split())))

    max = 0
    for i in range(n-m+1):
        for j in range(n-m+1):

            sum = 0
            for pari_i in range(m):
                for pari_j in range(m):
                    sum += arr[i+pari_i][j+pari_j]

            if max < sum:
                max = sum

    print(f"#{_+1} {max}")
