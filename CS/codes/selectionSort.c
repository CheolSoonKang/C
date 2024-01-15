#include<stdio.h>
/*
	summary : �ڷ� �� �ּڰ��� ã�� �ڷ��� ù ��Һ��� �� ��ұ��� ��ȯ�Ѵ�.
*/
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

int main() {
	int array[10] = { 12,5,2,32,54,23,1,7,21,17 };

	printf("before sort : ");

	for (int i = 0; i < 10;i++) {
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