##### (본 페이지는 C언어 x86기준으로 작성하였습니다.)

# 선택 정렬(BubbleSort)

제자리 정렬 알고리즘의 하나로,아래와 같은 순서로 진행된다.

1. 주어진 리스트 중에 최소값을 찾는다.
2. 그 값을 맨 앞에 위치한 값과 교체한다(패스(pass))
3. 맨 처음 위치를 뺀 나머지 리스트를 같은 방법으로 교체한다.

- (제자리 정렬 : 주어진 리스트외에 추가로 요구하는 메모리가 없거나  리스트의 수에 비해 충분히 무시할 만한 크기의 메모리를 요구하는 정렬 )



![bubble_sort_animation](../images/selectionsort/Selection_sort_animation.gif)



# main함수

```c
int main()
{
	int array[10] = {4,32,3,5,2,14,53,1,23,20};

	
	printf("before sort : ");
	for (int i = 0; i < 10;i++) {//
		printf("%3d",array[i]);
	}
	printf("\n\n");

	selectionSort(array,10);

	printf("after sort : ");
	for (int i = 0; i < 10; i++) {
		printf("%3d", array[i]);
	}
	printf("\n\n");


	return 0;
}
```

int형 배열 10자리에 10개의 숫자를 무작위로 선언하였다.

main함수에서는

> 1.정렬 전 배열을 출력
>
> 2.정렬
>
> 3.정렬 된 배열 출력  순서로 진행한다.

(정렬 알고리즘을 포스팅하면서 main함수는 바뀌지 않고 정렬 방법만 바뀔 예정입니다.)

# selectionSort함수

```c
void selectionSort(int * array,int lengthOfArray) {
	int temp = 0;
	int min;

	for (int i = 0; i < lengthOfArray-1;i++) {
		min = i;

		for (int j = i + 1; j < lengthOfArray;j++) {
			if (array[j] < array[min])
				min = j;
		}

		if (i != min) {
			temp = array[i];
			array[i] = array[min];
			array[min] = temp;
		}
			
	}
}
```

selectionSort()함수는 int형 포인터와 배열의 크기를 파라미터로 전달 받는다.

(나중에 포스팅 할 다른 정렬들도 대부분 배열의 포인터와 크기를 파라미터로 전달할 것이다.)

1. i는 0부터 시작하여  배열의 마지막에서 두번 째 원소까지 진행한다.

2. 처음 최솟값은 i번째 원소로 임시로 정하고, j는 배열의 i+1번째 원소부터 끝까지 진행하면서

   최소값을 찾으면 해당 인덱스로 min을 교체한다.

3. min과 i값이 다르다면  i인덱스와 min인덱스의 값을 교환해준다.

4. i가 마지막에서 두번 째 원소에 도착할 때까지 ,2,3번의 과정을 반복한다.


![Selection-Sort-Animation](../images/selectionsort/Selection-Sort-Animation.gif)


 # 특징

### 장점

- 최대 자료 교환 횟수가 정해져 있음

### 단점

- 같은 값의 자료가 있을 때  순서가 바뀔 수 있음



# 시간복잡도

![timecomplex(bubblesort)](../images/selectionsort/timecomplex(selectionsort).PNG)



# References

- 위키백과 - 선택정렬
- Do it! 자료구조와 함께 배우는 알고리즘 입문(한빛미디어)
- https://gmlwjd9405.github.io/2018/05/06/algorithm-selection-sort.html