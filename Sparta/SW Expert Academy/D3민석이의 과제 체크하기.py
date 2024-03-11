t = int(input())

for ind in range(t):
    n, k = map(int, input().split())
    m = list(map(int, input().split()))

    total_student = []
    for i in range(1, n+1):
        total_student.append(i)

    for i in range(k):
        total_student.remove(m[i])
    print(f'#{ind+1} ', end='')
    print(*total_student)
