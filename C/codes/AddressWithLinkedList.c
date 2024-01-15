#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct Address {
    char name[12];
    char phoneNumber[12];
    char address[30];
    struct Address* next;
    struct Address* prev;
} Address;

void printLine() {
    printf("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ\n\n");
}

void addAddress(Address** myAddress, Address** tail) {

    Address* newAddress = (Address*)malloc(sizeof(Address));

    printf("이름을 입력해주세요 : ");
    scanf("%s", newAddress->name);

    printf("휴대폰 번호를 입력해주세요 : ");
    scanf("%s", newAddress->phoneNumber);

    printf("주소를 입력해주세요 : ");
    scanf("%s", newAddress->address);
    if (*myAddress == NULL) {// empty node

        newAddress->next = NULL;
        newAddress->prev = NULL;
        *myAddress = newAddress;
        *tail = newAddress;
    }
    else {//one or more nodes
        newAddress->prev = *tail;
        newAddress->next = NULL;

        (*tail)->next = newAddress;
        newAddress->prev = *tail;
        *tail = newAddress;
    }
    printLine();//horizontal line output for readability
    printf("이름 : %s\n휴대폰번호 : %s\n주소 : %s\n이(가) 주소록에 추가되었습니다.\n", newAddress->name, newAddress->phoneNumber, newAddress->address);
    printLine();
}

void editAddress(Address** myAddress, Address** tail) {
    int i = 0;
    char searchName[10] = "";
    Address* p = *myAddress;//p is the current node and initialize to address pointer

    if (p == NULL) {//empty node
        printf("주소록이 비어있습니다.\n");
    }
    else {

		//selNum counts how many matching data nodes have
        //selNum2 number of nodes you want to edit
        int selNum = 0, selNum2 = 0;

        printf("수정하기 원하시는 이름을 입력해주세요 : ");
        scanf("%s", searchName);

        for (i = 0; p != NULL; i++) {//counts how many matching data nodes have
            if (!strcmp(searchName, p->name)) {
                selNum++;
            }
            p = p->next;
        }

        p = *myAddress;//initialize to address pointer

        if (selNum == 0) {
            printf("입력하신 정보가 없습니다.\n\n");
        }
        else if (selNum == 1) {//when the number of matching nodes is one
            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    break;
                }
                p = p->next;
            }
            printf("이름을 입력해주세요 : ");
            scanf("%s", p->name);

            printf("휴대폰 번호를 입력해주세요 : ");
            scanf("%s", p->phoneNumber);

            printf("주소를 입력해주세요 : ");
            scanf("%s", p->address);

        }
        else {// more than two
            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    printf("%d ㅣ 이름 : %s  휴대폰번호 : %s  주소 : %s\n", i + 1, p->name, p->phoneNumber, p->address);
                }
                p = p->next;
            }

            printLine();
            printf("%d개의 동명의 이름이 있습니다.\n", selNum);
            printf("어떤 정보를 수정하시겠습니까? : ");
            scanf("%d", &selNum2);

            p = *myAddress;

            for (i = 0; i < selNum2 - 1; i++) {
                p = p->next;
            }
            printf("%s\n", p->name);
            printf("이름을 입력해주세요 : ");
            scanf("%s", p->name);

            printf("휴대폰 번호를 입력해주세요 : ");
            scanf("%s", p->phoneNumber);

            printf("주소를 입력해주세요 : ");
            scanf("%s", p->address);
        }
    }
}

void searchAddress(Address** myAddress, Address** tail) {

    int i = 0, j = 0;
    char searchName[10] = "";
    Address* p = *myAddress;

    if (p == NULL) {
        printf("주소록이 비어있습니다.\n");
    }
    else {
        printf("찾기 원하시는 이름을 입력해주세요 : ");
        scanf("%s", searchName);

        for (i = 0; p != NULL; i++) {
            if (!strcmp(searchName, p->name)) {
                printf("이름 : %s  휴대폰번호 : %s  주소 : %s\n", p->name, p->phoneNumber, p->address);
                j++;
            }
            p = p->next;
        }
    }
    if (j == 0) {
        printf("찾으시는 정보가 없습니다.\n\n");
    }
    printLine();
}

void deleteAddress(Address** myAddress, Address** tail) {
    int i = 0;
    char searchName[10] = "";
    Address* p = *myAddress;

    if (p == NULL) {
        printf("주소록이 비어있습니다.\n");
    }
    else {

        int selNum = 0, selNum2 = 0;

        printf("삭제하기 원하시는 이름을 입력해주세요 : ");
        scanf("%s", searchName);

        for (p = *myAddress; p != NULL; p = p->next) {
            if (!strcmp(searchName, p->name)) {
                selNum++;
            }
        }

        if (selNum == 0) {
            printf("입력하신 정보가 없습니다.\n\n");
        }
        else if (selNum == 1) {//찾는 정보의 수가 1개

            for (p = *myAddress; p->next != NULL; p = p->next) {
                if (!strcmp(searchName, p->name)) {
                    break;
                }
            }

            if (p == *myAddress) {// case of p == headNode
                printf("headNode\n\n");
                *myAddress = p->next;

            }
            else if (p == *tail) {//case of p == tailNode

                printf("tailNode\n\n");
                p->prev->next = NULL;
                *tail = p->prev;

            }
            else {
                p->next->prev = p->prev;
                p->prev->next = p->next;
                printf("mIddleNode\n\n");
            }

            free(p);

        }
        else {//동명의 정보가 2개 이상

            printf("%d개의 동명의 이름이 있습니다.\n", selNum);

            p = *myAddress;

            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    printf("%d ㅣ 이름 : %s  휴대폰번호 : %s  주소 : %s\n", i + 1, p->name, p->phoneNumber, p->address);
                }
                p = p->next;
            }
            printLine();

            printf("어떤 정보를 삭제하시겠습니까? : ");
            scanf("%d", &selNum2);

            p = *myAddress;

            for (i = 0; i < selNum2 - 1; i++) {
                p = p->next;
            }

            if (p == *myAddress) {// case of p == headNode
                printf("headNode\n\n");
                *myAddress = p->next;

            }
            else if (p == *tail) {//case of p == tailNode

                printf("tailNode\n\n");
                p->prev->next = NULL;
                *tail = p->prev;

            }
            else {
                p->next->prev = p->prev;
                p->prev->next = p->next;
                printf("mIddleNode\n\n");
            }

            free(p);

            printf("삭제를 완료하였습니다.\n\n");
        }
    }
}

void printAddress(Address** myAddress, Address** tail) {

    Address* p = *myAddress;

    if (p == NULL) {
        printf("주소록이 비어있습니다.\n");
    }
    else {
        int i;
        printLine();
        for (i = 0; p != NULL; i++) {
            printf("%dㅣ 이름 : %s  휴대폰번호 : %s  주소 : %s\n", i + 1, p->name, p->phoneNumber, p->address);
            p = p->next;
        }
        printLine();
    }
}

void makeDummyData(Address** myAddress, Address** tail) {

    Address* AddressA = (Address*)malloc(sizeof(Address));
    Address* AddressB = (Address*)malloc(sizeof(Address));
    Address* AddressC = (Address*)malloc(sizeof(Address));
    Address* AddressD = (Address*)malloc(sizeof(Address));
    Address* AddressE = (Address*)malloc(sizeof(Address));
    Address* AddressF = (Address*)malloc(sizeof(Address));

    strcpy(AddressA->name, "김철수");
    strcpy(AddressA->phoneNumber, "01012345678");
    strcpy(AddressA->address, "경기도");

    strcpy(AddressB->name, "이민희");
    strcpy(AddressB->phoneNumber, "01045821254");
    strcpy(AddressB->address, "강원도");

    strcpy(AddressC->name, "안희윤");
    strcpy(AddressC->phoneNumber, "01045678912");
    strcpy(AddressC->address, "충청도");

    strcpy(AddressD->name, "유진혁");
    strcpy(AddressD->phoneNumber, "01023456789");
    strcpy(AddressD->address, "전라도");

    strcpy(AddressE->name, "안희윤");
    strcpy(AddressE->phoneNumber, "01012784536");
    strcpy(AddressE->address, "경상도");

    strcpy(AddressF->name, "김철수");
    strcpy(AddressF->phoneNumber, "01012784536");
    strcpy(AddressF->address, "경상도");

    AddressA->next = AddressB;
    AddressA->prev = NULL;

    AddressB->next = AddressC;
    AddressB->prev = AddressA;

    AddressC->next = AddressD;
    AddressC->prev = AddressB;

    AddressD->next = AddressE;
    AddressD->prev = AddressC;

    AddressE->next = AddressF;
    AddressE->prev = AddressD;

    AddressF->next = NULL;
    AddressF->prev = AddressE;

    *myAddress = AddressA;
    *tail = AddressF;


}

void saveFile(Address** myAddress) {
    FILE* fp = fopen("address.txt", "a");
    Address* p;

    for (p = *myAddress; p != NULL; p = p->next) {
        fprintf(fp, "%s %s %s\n", p->name, p->phoneNumber, p->address);
    }
    fclose(fp);
}

int main() {

    int selNum;
    Address* myAddress = NULL;
    Address* tail = NULL;

    makeDummyData(&myAddress, &tail);

    while (1) {
        selNum = 0;
        printf("원하시는 메뉴의 번호를 선택 후 엔터를 눌러주세요.\n\n");
        printf("1.add  2.update  3.search\n4.delete  5.print 6.save 7.exit\n");
        printLine();
        scanf("%d", &selNum);

        if (selNum == 7) {
            printf("계산기를 종료합니다.\n");
            break;
        }
        switch (selNum) {
        case 1:
            addAddress(&myAddress, &tail);
            break;
        case 2:
            editAddress(&myAddress, &tail);
            break;
        case 3:
            searchAddress(&myAddress, &tail);
            break;
        case 4:
            deleteAddress(&myAddress, &tail);
            break;
        case 5:
            printAddress(&myAddress, &tail);
            break;
        case 6:
            saveFile(&myAddress);
            break;

        default:
            printf("잘못 입력하셨습니다. 메뉴를 보시고 숫자를 입력해주세요.\n\n\n");
            break;
        }
    }

    return 0;
}