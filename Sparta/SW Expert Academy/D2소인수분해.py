t = int(input())


def make_dict_element(dict, arr):
    for i in arr:
        dict[str(i)] = 0


for ind in range(t):
    n = int(input())
    temp = n
    factor = [2, 3, 5, 7, 11]
    a_dict = {}

    make_dict_element(a_dict, factor)

    for i in range(2, n+1):
        if temp % i == 0:
            while temp % i == 0:
                if str(i) in a_dict:
                    a_dict[str(i)] += 1
                else:
                    a_dict[str(i)] = 1
                temp //= i

    print(f'#{ind+1} {a_dict[str(factor[0])]} {a_dict[str(factor[1])]
                                               } {a_dict[str(factor[2])]} {a_dict[str(factor[3])]} {a_dict[str(factor[4])]}')
