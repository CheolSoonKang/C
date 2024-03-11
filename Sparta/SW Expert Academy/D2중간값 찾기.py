n = int(input())
n_int = list(map(int, input().split()))
n_int.sort()
print(n_int[n//2])
