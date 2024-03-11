for _ in range(10):
    t = int(input())
    n, m = map(int, input().split())

    def prodi(a, b):
        if b == 1:
            return a

        summary = a * prodi(a, b - 1)
        return summary

    print(f'#{t} {prodi(n, m)} ')
