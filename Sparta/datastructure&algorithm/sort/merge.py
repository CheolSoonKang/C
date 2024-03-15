sorted = []


def merge(arr, left, mid, right):
    i = left
    j = mid+1
    k = left

    while i <= mid and j <= right:
        if arr[i] <= arr[j]:
            sorted[k] = arr[i]
            k += 1
            i += 1
        else:
            sorted[k] = arr[j]
            k += 1
            j += 1

    if i > mid:
        for l in range(j, right+1):
            sorted[k] = arr[l]
            k += 1
    else:
        for l in range(i, mid+1):
            sorted[k] = arr[l]
            k += 1

    for l in range(left, right+1):
        arr[l] = sorted[l]


def merge_sort(arr, left, right):
    mid = 0

    if left < right:
        mid = (left + right)//2
        merge_sort(arr, left, mid)
        merge_sort(arr, mid+1, right)
        merge(arr, left, mid, right)


arr = [21, 10, 12, 20, 25, 13, 15, 22]

merge(arr, 0, len(arr)-1)

print(arr)
