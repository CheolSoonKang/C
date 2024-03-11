def find_x(arr):
    return arr[len(arr)-1].index(2)

# with file open
# test_num = 0
# with open("사다리input.txt", "r") as f:
#     while True:
#         test_num = f.readline()
#         if not test_num:
#             break

#         arr = []
#         for i in range(100):
#             arr.append(list(map(int, f.readline().split())))
#         x = find_x(arr)
#         y = 99

#         while y > 0:
#             if x == 0:
#                 if arr[y][x+1] == 1:  # go left
#                     while arr[y][x+1] == 1:
#                         x += 1
#             elif x == 99:  # go left
#                 if arr[y][x-1] == 1:
#                     while arr[y][x-1] == 1:
#                         x -= 1
#             else:
#                 if arr[y][x+1] == 1:
#                     while arr[y][x+1] == 1:
#                         x += 1
#                         if x == 99:
#                             break

#                 elif arr[y][x-1] == 1:
#                     while arr[y][x-1] == 1:
#                         x -= 1
#                         if x == 0:
#                             break
#             y -= 1
#         print('#{} {}'.format(test_num, x))


for _ in range(10):
    arr = []
    n = 100
    test_num = int(input())

    for i in range(n):
        arr.append(list(map(int, input().split())))
    x = find_x(arr)
    y = 99

    while y > 0:
        if x == 0:
            if arr[y][x+1] == 1:
                while arr[y][x+1] == 1:
                    x += 1
        elif x == 99:
            if arr[y][x-1] == 1:
                while arr[y][x-1] == 1:
                    x -= 1
        else:
            if arr[y][x+1] == 1:
                while arr[y][x+1] == 1:
                    x += 1
                    if x == 99:
                        break
            elif arr[y][x-1] == 1:
                while arr[y][x-1] == 1:
                    x -= 1
                    if x == 0:
                        break
        y -= 1

    print('#{} {}'.format(test_num, x))
