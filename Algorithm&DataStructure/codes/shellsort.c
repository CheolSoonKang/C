#include<stdio.h>
#define MAX_SIZE 10

//first : subList first index
//last  : sublist last index
void insertionSort(int *array,int first,int last,int gap){
    int i,j,key;

    for(int i = first + gap;i <= last;i += gap){
        key = array[i];

        for(j = i-gap; j >= first && array[j] > key; j -= gap){
            array[j+gap] = array[j];
        }
        array[j + gap] = key;
    }
}


void shellSort(int * array,int lengthOfArray){
    int i,gap;

    for(gap = lengthOfArray/2; gap > 0;gap /= 2){
        if(gap % 2 == 0){
            gap++;
        }

        for(i = 0;i < gap;i++){
            insertionSort(array,i,lengthOfArray-1,gap);
        }
    }
}

int main() {
	int array[20] = { 12,5,2,32,54,23,1,7,21,17 };

	printf("before sort : ");

	for (int i = 0; i < 10;i++) {
		printf("%3d",array[i]);
	}
	printf("\n\n");

	shellSort(array,MAX_SIZE);

	printf("after sort : ");

	for (int i = 0; i < 10; i++) {
		printf("%3d", array[i]);
	}
	printf("\n\n");

	return 0;
}