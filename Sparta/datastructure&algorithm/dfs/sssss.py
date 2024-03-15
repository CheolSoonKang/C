memo = [0, 1]


def fibo(n):
    if n < len(memo):  # 만약 메모지에 적혀있다면
        return memo[n]  # 메모지에서 바로 읽어요

    memo.append(fibo(n - 1) + fibo(n - 2))  # 그렇지 않다면 메모해요
    return memo[n]  # 메모지를 읽어요


print(fibo(10))
