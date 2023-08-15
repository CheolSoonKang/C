#include<stdio.h>
# define MAX_SIZE 10
#define swap(type,x,y)do{type t=x;x=y;y=t;}while(0)

void print(int* array, int lengthOfArray) {
	for (int i = 0; i < lengthOfArray; i++) {
		printf("%3d", array[i]);
	}
	printf("\n\n");
}
// 퀵 정렬
void quickSort(int array[], int left, int right){
	int pl = left;
	int pr = right;
	int pivot = array[(pl + pr) / 2];

	do {
		while (array[pl] < pivot) pl++;
		while (array[pr] > pivot) pr--;

		if (pl <= pr) {
			swap(int, array[pl], array[pr]);
			pl++;
			pr--;
		}
	} while (pl <= pr);
	print(array,MAX_SIZE);
	if (left < pr) quickSort(array,left,pr);
	if (right > pl)quickSort(array,pl,right);
  

}

int main()
{
	int array[10] = {4,32,3,5,2,14,53,1,23,20};


	printf("before sort : ");
	print(array,MAX_SIZE);

	quickSort(array,0,MAX_SIZE-1);

	printf("after sort : ");
	print(array,MAX_SIZE);


	return 0;
}