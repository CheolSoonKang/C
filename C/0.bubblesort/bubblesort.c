#include<stdio.h>
#define swap(x,y,temp) {temp = x;x = y;y = temp;}
//summary : �迭 ��� �� ó������ ������ �� ��Ҹ� ���Ͽ�
//          �迭�� �� �ڿ������� ���� ū ��Ұ� ���ĿϷ�ȴ�.


void bubbleSort(int * array,int n) {

	int temp;

	for (int i = n - 1; i > 0; i--) {

		for (int j = 0; j < i;j++) {//Send the max value to the end of the array
			if (array[j]>array[j+1]) {
				swap(array[j], array[j + 1], temp);
			}
			
		}
	}

	/*for (int i = 0; i < n; i++) {
		for (int j = i; j < n-1;j++) {
			if (array[j]>array[j+1]) {
				swap(array[j], array[j+1],temp);
			}
		}
	}*/

}

int main()
{
	int array[10] = {4,32,3,5,2,14,53,1,23,20};


	printf("before sort : ");
	for (int i = 0; i < 10;i++) {
		printf("%3d",array[i]);
	}
	printf("\n\n");

	bubbleSort(array,10);

	printf("after sort : ");
	for (int i = 0; i < 10; i++) {
		printf("%3d", array[i]);
	}
	printf("\n\n");


	return 0;
}