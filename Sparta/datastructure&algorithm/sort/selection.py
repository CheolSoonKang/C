def selection_sort(arr):

    for i in range(len(arr)-1):
        minimum = i

        for j in range(i+1, len(arr)):
            if arr[j] < arr[minimum]:

                minimum = j

        arr[i], arr[minimum] = arr[minimum], arr[i]


arr = [5, 11, 13, 4, 9, 1, 6, 2, 7]

print(arr)
selection_sort(arr)
print(arr)
