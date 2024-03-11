t = int(input())


def dfs(i, taste, kcal):
    global max_taste

    if kcal > l:
        return
    if max_taste < taste:
        max_taste = taste
    if i == n:
        return

    dfs(i+1, taste + t_list[i], kcal + k_list[i])
    dfs(i+1, taste, kcal)


for ind in range(t):
    n, l = map(int, input().split())
    t_list = []
    k_list = []
    max_taste = 0

    for _ in range(n):
        t, k = list(map(int, input().split()))
        t_list.append(t)
        k_list.append(k)

    dfs(0, 0, 0)
    print(max_taste)
