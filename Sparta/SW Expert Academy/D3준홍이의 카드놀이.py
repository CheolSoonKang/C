t = int(input())
for ind in range(t):
    n, m = list(map(int, input().split()))
    total = [0 for i in range(n+m-1)]

    for i in range(1, n+1):
        for j in range(1, m+1):
            total[i+j-2] += 1

    result = []
    max_start_index = total.index(max(total))

    for i in range(max_start_index, len(total)):
        if total[i] == max(total):
            result.append(i+2)

    print(f'#{ind+1} ', end='')
    print(*result)
