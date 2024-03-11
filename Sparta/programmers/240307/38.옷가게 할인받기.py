def solution(price):
    discount = 0
    if 100000 <= price < 300000:
        discount = 5
    elif 300000 <= price < 500000:
        discount = 10
    elif price >= 500000:
        discount = 20

    return int(price * (100 - discount) / 100)
