def solution(num_list):
    even = ''
    odd = ''

    for ele in num_list:
        if ele % 2 == 0:
            even += str(ele)
        else:
            odd += str(ele)

    return sum([int(even), int(odd)])
