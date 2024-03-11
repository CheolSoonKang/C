n = int(input())


for ind in range(n):

    def my_sum(num):
        if num % 2 == 0:
            return -num + my_sum(num-1)
        if num == 1:
            return num
        return num + my_sum(num-1)

    number = int(input())
    print(f'#{ind+1} {my_sum(number)}')
