##### (본 페이지는 C언어 x86기준으로 작성하였습니다.)

# 삽입 정렬(InsertionSort)

흔히 손 안의 카드 정렬이라고 하는 삽입정렬은 자료의 모든 요소를 앞에서부터 차례대로

이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성한다.




![bubble_sort_animation](../images/insertionsort/insertion_sort_animation.gif)



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

	insertionSort(array,10);

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



# insertionSort함수

```c
void insertionSort(int * array,int lengthOfArray){

    int i,j,key;
 
    for(i=1;i<lengthOfArray;i++){

        key = array[i];
        for(j=i-1; j>=0 && array[j]>key; j--){
            array[j+1] = array[j];
        }
        array[j+1] = key;
    }
}
```

insertionSort()함수는 int형 포인터와 배열의 크기를 파라미터로 전달 받는다.

 (나중에 포스팅 할 다른 정렬들도 대부분 배열의 포인터와 크기를 파라미터로 전달할 것이다.)

1. i 는 두 번째 원소부터 시작해 배열의 마지막까지 진행한다.

2. i 인덱스의 값을 키 값으로 지정한다.

3. j 는 i 의 이전 요소부터 시작해서 j 인덱스의 값이 i 인덱스의 값보다

   클 때까지 한 칸씩 뒤로 미루며 감소한다.


4. 빈 자리에 j 인덱스의 값에 i 인덱스의 값을 넣는다.
5. 2 ~ 4 의 과정을 반복한다.

​            ![Selection-Sort-Animation](../images/insertionsort/Insertion-Sort-Animation.gif)



 # 특징

### 장점

- 레코드의 수가 적거나 어느 정도 정렬되어 있는 데이터의 경우 매우 효율적

### 단점

- 정렬 대상 레코드가 자리를 찾아 들어갈 때까지 앞서 정렬된 레코드의 이동을

  요구하기 때문에 레코드의 수가 많을 경우 비효율적이다.




# 시간복잡도

![timecomplex(bubblesort)](../images/insertionsort/timecomplex(insertionsort).PNG)



# References

- 위키백과 - 삽입정렬
- Do it! 자료구조와 함께 배우는 알고리즘 입문(한빛미디어)
- https://gmlwjd9405.github.io/2018/05/06/algorithm-insertion-sort.html