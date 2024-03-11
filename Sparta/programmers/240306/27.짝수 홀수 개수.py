def solution(num_list):
    even, odd = 0, 0
    for ele in num_list:
        if ele % 2 == 0:
            even += 1
        else:
            odd += 1
    return [even, odd]
