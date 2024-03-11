def solution(angle):
    if angle == 90:
        angle = 2
    elif angle < 90:
        angle = 1
    elif 90 < angle < 180:
        angle = 3
    else:
        angle = 4
    return angle
