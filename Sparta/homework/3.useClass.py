import hashlib
import re

# Member class has attribution(name,username(id), password)


class Member():
    name = ''
    username = ''
    password = ''

    def __init__(self, name='default_name', username='default_username', password='default_password'):
        self.name = name
        self.username = username
        self.password = password

    def display(self):
        print(f'name : {self.name} id : {self.username}')


class Post():
    title = ''
    content = ''
    author = ''

    def __init__(self, title='', content='', author=''):
        self.title = title
        self.content = content
        self.author = author


# dummy members data
members = []
user_1 = Member(name='최민식', username='cms', password='1234')
user_2 = Member(name='이병헌', username='lbh', password='1234')
user_3 = Member(name='이영애', username='lya', password='1234')

members.append(user_1)
members.append(user_2)
members.append(user_3)

# display member information(name and id)
for element in members:
    element.display()
print('\n')

# dummy posts data
posts = []
user_1_post_1 = Post(title='범죄와의 전쟁', content='2012년작', author=user_1.name)
user_1_post_2 = Post(title='신세계', content='2013년작', author=user_1.name)
user_1_post_3 = Post(title='명량', content='2014년작', author=user_1.name)
user_1_post_4 = Post(title='루시', content='2014년작', author=user_1.name)

posts.append(user_1_post_1)
posts.append(user_1_post_2)
posts.append(user_1_post_3)
posts.append(user_1_post_4)

user_2_post_1 = Post(title='광해', content='2012년작 일수도', author=user_2.name)
user_2_post_2 = Post(title='내부자들', content='2015년작 인가?', author=user_2.name)
user_2_post_3 = Post(title='터미네이터 제네시스',
                     content='2015년작 일겁니다.', author=user_2.name)
user_2_post_4 = Post(
    title='협녀, 칼의 기억', content='2015년작 였었나요?', author=user_2.name)
user_2_post_5 = Post(title='남산의 부장들', content='2020년작이었지', author=user_2.name)

posts.append(user_2_post_1)
posts.append(user_2_post_2)
posts.append(user_2_post_3)
posts.append(user_2_post_4)
posts.append(user_2_post_5)

user_3_post_1 = Post(title='공동경비구역 JSA',
                     content='2000년작 였을수도', author=user_3.name)
user_3_post_2 = Post(
    title='봄날은 간다', content='2001년작 였었나요?', author=user_3.name)
user_3_post_3 = Post(
    title='친절한 금자씨', content='2005년작 일겁니다', author=user_3.name)

posts.append(user_3_post_1)
posts.append(user_3_post_2)
posts.append(user_3_post_3)

for element in posts:
    if element.author == '이병헌':
        print(element.title)
print('\n')

for element in posts:
    if element.content == '2012년작':
        print(element.title)

while 1:
    print('1. 멤버 추가 , 2. post 추가 , 3.모든 멤버 출력 , 4.모든 포스트 출력\n5 이름으로 게시글 제목 찾기 , 6. 단어로 게시글 찾기 , 7. 종료')
    select_num = input('메뉴를 선택해주세요 : ')
    while select_num != '1' and select_num != '2' and select_num != '3' and select_num != '4' and select_num != '5' and select_num != '6' and select_num != '7':
        print('유효하지 않은 메뉴입니다.\n1. 멤버 추가 , 2. post 추가 , 3.모든 멤버 출력 , 4.모든 포스트 출력\n5 이름으로 게시글 제목 찾기 , 6. 단어로 게시글 찾기 , 7. 종료')
        select_num = input('메뉴를 선택해주세요 : ')

    match select_num:
        case '1':
            # enter user info
            new_user_name = input('이름을 입력해주세요 : ')
            new_user_username = input('아이디를 입력해주세요 : ')
            new_user_password = input('비밀번호를 입력해주세요 : ')

            # hashing password
            hash_object = hashlib.sha256(new_user_password.encode())
            hashed_password = hash_object.hexdigest()

            # make member instance
            new_user = Member(name=new_user_name,
                              username=new_user_username, password=hashed_password)
            # append to members list
            members.append(new_user)
            print(f'name(id) : {new_user_name}({
                  new_user_username})\n이(가) 정상적으로 저장되었습니다.')
        case '2':
            new_post_title = input('제목을 입력해주세요 : ')
            new_post_content = input('몇 년도 작품인가요(ex> 2024년작) : ')
            new_post_author = input('누구의 작품인가요: ')
            author_check = 0
            while not author_check:
                for element in members:
                    if element.name == new_post_author:
                        author_check = 1

                if author_check:
                    break
                print('멤버에 없는 인물입니다.')
                new_post_author = input('누구의 작품인가요: ')

            new_post = Post(title=new_post_title,
                            content=new_post_content, author=new_post_author)
            posts.append(new_post)
            print(f'title : {new_post.title} , content :{
                  new_post_content} , author : {new_post_author}\n이(가) 정상적으로 저장되었습니다.')

        case '3':
            for element in members:
                print(f'이름 : {element.name}({element.username}) ')
            print('\n')

        case '4':
            for element in posts:
                print(f'author : {element.author}  title: {
                      element.title} content : {element.content}')
            print('\n')

        case '5':
            flag = 0
            search_author = input('이름을 입력해주세요 : ')
            p = re.compile(f'^{search_author}$')

            for element in posts:
                if p.match(element.author):
                    flag = 1
                    print(f'author : {element.author}  title: {
                          element.title} content : {element.content}')
            if flag == 0:
                print('찾으시는 이름의 게시글이 없습니다.')
            print('\n')
        case '6':
            flag = 0
            search_word = input('게시글에서 찾으시는 단어 입력하세요 : ')
            if len(search_word) < 2:
                print('2음절 이상 입력해주세요.\n')
                continue
            p = re.compile(f'^{search_word}')

            for element in posts:  # loop posts
                # split content with 'space word'
                splited_word = list(element.content.split())

                # compare each word of 'content' with 'search_word'
                for sw in splited_word:
                    # find matcing post
                    if p.search(sw):
                        flag = 1
                        print(f'author : {element.author}  title: {
                              element.title} content : {element.content}')
                        continue
            # no matching post
            if flag == 0:
                print('찾으시는 이름의 게시글이 없습니다.')
            print('\n')
        case '7':
            print('프로그램을 종료합니다.')
            break
