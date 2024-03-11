for ind in range(10):
    length = int(input())
    operator_str = list(input())

    operand = []
    operator = []

    for i in range(length):
        try:
            operand.append(int(i))
        except:
            operand.append(i)

    print(operand)
    print(operator)
