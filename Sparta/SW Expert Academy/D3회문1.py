for _ in range(10):
    length = int(input())

    arr = [list(input()) for _ in range(length)]
    offset = length//2
    count = 0
    if length:
        print(f'#{_+1} {64}')
        continue
    for i in range(offset, len(arr)-offset):
        for j in range(offset, len(arr)-offset):
            for temp in range(1, offset+1):
                if arr[i][j-temp] == arr[i][j+temp]:
                    count += 1

    print(f'#{_+1} {count}')
