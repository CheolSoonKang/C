#include<stdio.h>
//�迭 ��� �� ó������ ������ �� ��Ҹ� ���Ͽ�
//�迭�� �� �ڿ������� ���� ū ��Ұ� ���ĿϷ�ȴ�.

void bubbleSort(int * array,int lengthOfArray) {
	
	int temp;

	for (int i = lengthOfArray - 1; i > 0; i--) {

		for (int j = 0; j < i;j++) {//Send the max value to the end of the array
			if (array[j]>array[j+1]) {
				temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		}
	}
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