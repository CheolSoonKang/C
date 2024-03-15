def bubble_sort(arr):

    for i in range(len(arr)):
        for j in range(len(arr)-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]


arr = [5, 11, 13, 4, 9, 1, 6, 2, 7]
print(arr)
bubble_sort(arr)
print(arr)
