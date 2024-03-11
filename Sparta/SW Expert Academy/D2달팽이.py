t = int(input())

for ind in range(t):

    n = int(input())
    arr = []
    for i in range(n):
        subarr = []
        for j in range(n):
            subarr.append(0)
        arr.append(subarr)

    val = 1

    i, j, k = 0, 0, -1
    while val < (n*n)+1:

        # go right
        while j < n and arr[i][j] == 0:
            arr[i][j] = val
            j += 1
            val += 1
        j -= 1
        i += 1

        # go down
        while i < n and arr[i][j] == 0:
            arr[i][j] = val
            i += 1
            val += 1
        i -= 1
        j -= 1

        # go left
        while j > k and arr[i][j] == 0:
            arr[i][j] = val
            j -= 1
            val += 1
        j += 1
        i -= 1
        k += 1

        # go up
        while i > k and arr[i][j] == 0:
            arr[i][j] = val
            i -= 1
            val += 1
        i += 1
        j += 1
    print(f'#{ind + 1}')
    for ele in arr:
        for el in ele:
            print(el, end=' ')
        print()
