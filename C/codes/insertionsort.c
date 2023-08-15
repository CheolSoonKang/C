#include<stdio.h>
/* summary : sort card in hand
*/
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



int main() {
	int array[10] = { 12,5,2,32,54,23,1,7,21,17 };

	printf("before sort : ");

	for (int i = 0; i < 10;i++) {
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