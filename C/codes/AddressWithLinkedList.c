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
    printf("�ѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤѤ�\n\n");
}

void addAddress(Address** myAddress, Address** tail) {

    Address* newAddress = (Address*)malloc(sizeof(Address));

    printf("�̸��� �Է����ּ��� : ");
    scanf("%s", newAddress->name);

    printf("�޴��� ��ȣ�� �Է����ּ��� : ");
    scanf("%s", newAddress->phoneNumber);

    printf("�ּҸ� �Է����ּ��� : ");
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
    printf("�̸� : %s\n�޴�����ȣ : %s\n�ּ� : %s\n��(��) �ּҷϿ� �߰��Ǿ����ϴ�.\n", newAddress->name, newAddress->phoneNumber, newAddress->address);
    printLine();
}

void editAddress(Address** myAddress, Address** tail) {
    int i = 0;
    char searchName[10] = "";
    Address* p = *myAddress;//p is the current node and initialize to address pointer

    if (p == NULL) {//empty node
        printf("�ּҷ��� ����ֽ��ϴ�.\n");
    }
    else {

		//selNum counts how many matching data nodes have
        //selNum2 number of nodes you want to edit
        int selNum = 0, selNum2 = 0;

        printf("�����ϱ� ���Ͻô� �̸��� �Է����ּ��� : ");
        scanf("%s", searchName);

        for (i = 0; p != NULL; i++) {//counts how many matching data nodes have
            if (!strcmp(searchName, p->name)) {
                selNum++;
            }
            p = p->next;
        }

        p = *myAddress;//initialize to address pointer

        if (selNum == 0) {
            printf("�Է��Ͻ� ������ �����ϴ�.\n\n");
        }
        else if (selNum == 1) {//when the number of matching nodes is one
            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    break;
                }
                p = p->next;
            }
            printf("�̸��� �Է����ּ��� : ");
            scanf("%s", p->name);

            printf("�޴��� ��ȣ�� �Է����ּ��� : ");
            scanf("%s", p->phoneNumber);

            printf("�ּҸ� �Է����ּ��� : ");
            scanf("%s", p->address);

        }
        else {// more than two
            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    printf("%d �� �̸� : %s  �޴�����ȣ : %s  �ּ� : %s\n", i + 1, p->name, p->phoneNumber, p->address);
                }
                p = p->next;
            }

            printLine();
            printf("%d���� ������ �̸��� �ֽ��ϴ�.\n", selNum);
            printf("� ������ �����Ͻðڽ��ϱ�? : ");
            scanf("%d", &selNum2);

            p = *myAddress;

            for (i = 0; i < selNum2 - 1; i++) {
                p = p->next;
            }
            printf("%s\n", p->name);
            printf("�̸��� �Է����ּ��� : ");
            scanf("%s", p->name);

            printf("�޴��� ��ȣ�� �Է����ּ��� : ");
            scanf("%s", p->phoneNumber);

            printf("�ּҸ� �Է����ּ��� : ");
            scanf("%s", p->address);
        }
    }
}

void searchAddress(Address** myAddress, Address** tail) {

    int i = 0, j = 0;
    char searchName[10] = "";
    Address* p = *myAddress;

    if (p == NULL) {
        printf("�ּҷ��� ����ֽ��ϴ�.\n");
    }
    else {
        printf("ã�� ���Ͻô� �̸��� �Է����ּ��� : ");
        scanf("%s", searchName);

        for (i = 0; p != NULL; i++) {
            if (!strcmp(searchName, p->name)) {
                printf("�̸� : %s  �޴�����ȣ : %s  �ּ� : %s\n", p->name, p->phoneNumber, p->address);
                j++;
            }
            p = p->next;
        }
    }
    if (j == 0) {
        printf("ã���ô� ������ �����ϴ�.\n\n");
    }
    printLine();
}

void deleteAddress(Address** myAddress, Address** tail) {
    int i = 0;
    char searchName[10] = "";
    Address* p = *myAddress;

    if (p == NULL) {
        printf("�ּҷ��� ����ֽ��ϴ�.\n");
    }
    else {

        int selNum = 0, selNum2 = 0;

        printf("�����ϱ� ���Ͻô� �̸��� �Է����ּ��� : ");
        scanf("%s", searchName);

        for (p = *myAddress; p != NULL; p = p->next) {
            if (!strcmp(searchName, p->name)) {
                selNum++;
            }
        }

        if (selNum == 0) {
            printf("�Է��Ͻ� ������ �����ϴ�.\n\n");
        }
        else if (selNum == 1) {//ã�� ������ ���� 1��

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
        else {//������ ������ 2�� �̻�

            printf("%d���� ������ �̸��� �ֽ��ϴ�.\n", selNum);

            p = *myAddress;

            for (i = 0; p != NULL; i++) {
                if (!strcmp(searchName, p->name)) {
                    printf("%d �� �̸� : %s  �޴�����ȣ : %s  �ּ� : %s\n", i + 1, p->name, p->phoneNumber, p->address);
                }
                p = p->next;
            }
            printLine();

            printf("� ������ �����Ͻðڽ��ϱ�? : ");
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

            printf("������ �Ϸ��Ͽ����ϴ�.\n\n");
        }
    }
}

void printAddress(Address** myAddress, Address** tail) {

    Address* p = *myAddress;

    if (p == NULL) {
        printf("�ּҷ��� ����ֽ��ϴ�.\n");
    }
    else {
        int i;
        printLine();
        for (i = 0; p != NULL; i++) {
            printf("%d�� �̸� : %s  �޴�����ȣ : %s  �ּ� : %s\n", i + 1, p->name, p->phoneNumber, p->address);
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

    strcpy(AddressA->name, "��ö��");
    strcpy(AddressA->phoneNumber, "01012345678");
    strcpy(AddressA->address, "��⵵");

    strcpy(AddressB->name, "�̹���");
    strcpy(AddressB->phoneNumber, "01045821254");
    strcpy(AddressB->address, "������");

    strcpy(AddressC->name, "������");
    strcpy(AddressC->phoneNumber, "01045678912");
    strcpy(AddressC->address, "��û��");

    strcpy(AddressD->name, "������");
    strcpy(AddressD->phoneNumber, "01023456789");
    strcpy(AddressD->address, "����");

    strcpy(AddressE->name, "������");
    strcpy(AddressE->phoneNumber, "01012784536");
    strcpy(AddressE->address, "���");

    strcpy(AddressF->name, "��ö��");
    strcpy(AddressF->phoneNumber, "01012784536");
    strcpy(AddressF->address, "���");

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
        printf("���Ͻô� �޴��� ��ȣ�� ���� �� ���͸� �����ּ���.\n\n");
        printf("1.add  2.update  3.search\n4.delete  5.print 6.save 7.exit\n");
        printLine();
        scanf("%d", &selNum);

        if (selNum == 7) {
            printf("���⸦ �����մϴ�.\n");
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
            printf("�߸� �Է��ϼ̽��ϴ�. �޴��� ���ð� ���ڸ� �Է����ּ���.\n\n\n");
            break;
        }
    }

    return 0;
}