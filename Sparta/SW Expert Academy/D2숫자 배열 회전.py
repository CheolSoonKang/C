t = int(input())

for ind in range(t):
    l = int(input())

    arr = []
    for i in range(l):
        arr.append(list(map(int, input().split())))

    arr90 = list(list(0 for _ in range(l)) for _ in range(l))
    arr180 = list(list(0 for _ in range(l)) for _ in range(l))
    arr270 = list(list(0 for _ in range(l)) for _ in range(l))

    # spin 90
    for i in range(l):
        for j in range(l):
            arr90[i][j] = arr[l-1-j][i]
    # spin 180
    for i in range(l):
        for j in range(l):
            arr180[i][j] = arr90[l-1-j][i]
    # spin 270
    for i in range(l):
        for j in range(l):
            arr270[i][j] = arr180[l-1-j][i]
    print(f'#{ind+1}')
    for i in range(l):
        print(''.join(list(map(str, arr90[i]))), end=' ')
        print(''.join(list(map(str, arr180[i]))), end=' ')
        print(''.join(list(map(str, arr270[i]))))
