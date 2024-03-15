def partition(arr, left, right):
    low = left
    high = right+1
    pivot = arr[left]

    while True:
        while True:
            low += 1

            condition = low <= right and arr[low] < pivot
            if not condition:
                break

        while True:
            high -= 1
            condition = high >= left and arr[high] > pivot
            if not condition:
                break

        if low < high:
            arr[low], arr[high] = arr[high], arr[low]

        if low > high:
            break

    arr[left], arr[high] = arr[high], arr[left]

    return high


def quick_sort(arr, left, right):
    if left < right:
        q = partition(arr, left, right)

        quick_sort(arr, left, q-1)
        quick_sort(arr, q+1, right)


arr = [5, 11, 13, 4, 9, 1, 6, 2, 7]

print(arr)
quick_sort(arr, 0, len(arr)-1)
print(arr)
