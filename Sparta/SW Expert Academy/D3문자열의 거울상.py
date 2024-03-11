t = int(input())

for ind in range(t):
    string = input()
    my_filter = {
        'b': 'p',
        'd': 'q',
        'q': 'd',
        'p': 'b'
    }

    string = list(string)
    result = []
    for i in string:
        result.append(my_filter[i])
    result = ''.join(result)
    print(f'#{ind+1} {result}')
