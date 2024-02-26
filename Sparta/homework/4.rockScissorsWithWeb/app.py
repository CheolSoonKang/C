from flask import Flask, render_template, request, redirect, url_for
import os
import random
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///' + os.path.join(basedir, 'database.db')

db = SQLAlchemy(app)


class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String, nullable=False)
    computer = db.Column(db.String, nullable=False)
    winner = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'참여자 : {self.user} , 컴퓨터 : {self.computer}, 결과 : {self.winner}'


with app.app_context():
    db.create_all()


# route
@app.route('/')
def home():
    win = 0
    lose = 0
    draw = 0
    score_list = Score.query.all()
    data = []
    for element in score_list:
        if element.winner == '비겼습니다.':
            draw += 1
        elif element.winner == '컴퓨터':
            lose += 1
        else:
            win += 1

        result_one_row = {
            'user': element.user,
            'computer': element.computer,
            'winner': element.winner,
        }
        data.append(result_one_row)
    print(f'win:{win} , lose:{lose} , draw:{draw}')

    return render_template('index.html', data={'data': data, 'last_scores': {'win': win, 'lose': lose, 'draw': draw}}, enumerate=enumerate, len=len)


@app.route('/judge')
def judge():

    if request.args.get('query'):
        win = 0
        lose = 0
        draw = 0
        winner = ''
        game = ['가위', '바위', '보']
        user = request.args.get('query')
        computer = game[random.randint(0, 2)]

        if user == '가위':
            if computer == '가위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다')
                draw += 1
                winner = '비겼습니다.'
            elif computer == '바위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
                lose += 1
                winner = '컴퓨터'
            else:
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
                win += 1
                winner = '사용자'
        elif user == '바위':
            if computer == '가위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
                win += 1
                winner = '사용자'
            elif computer == '바위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다.')
                draw += 1
                winner = '비겼습니다.'
            else:
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
                lose += 1
                winner = '컴퓨터'
        elif user == '보':
            if computer == '가위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n컴퓨터 승리!')
                lose += 1
                winner = '컴퓨터'
            elif computer == '바위':
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n사용자 승리!')
                win += 1
                winner = '사용자'
            else:
                print(f'사용자 : {user} , 컴퓨터 : {computer}\n비겼습니다.')
                draw += 1
                winner = '비겼습니다.'
        print(f'win:{win} , lose:{lose} , draw:{draw}')
        result = Score(user=user, computer=computer, winner=winner)
        db.session.add(result)
        db.session.commit()
        data = {
            'user': user,
            'computer': computer,
            'winner': winner
        }
        return data


if __name__ == '__main__':
    app.run(debug=True, port=3000)
