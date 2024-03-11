def solution(s1, s2):
    answer = []
    for ele in s1:
        if ele in s2:
            answer.append(ele)

    return len(answer)


def solution2(s1, s2):
    return len(set(s1) & set(s2))
