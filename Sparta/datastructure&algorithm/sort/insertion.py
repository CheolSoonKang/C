def bubble_sort(arr):

    for i in range(1, len(arr)):
        temp = arr[i]
        j = i-1
        while j >= 0 and arr[j] > temp:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = temp


arr = [5, 11, 13, 4, 9, 1, 6, 2, 7]
print(arr)
bubble_sort(arr)
print(arr)
