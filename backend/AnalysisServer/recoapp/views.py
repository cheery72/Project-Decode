from multiprocessing import connection
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo
from .recommend.content import cb
from .recommend.review import cf
from .recommend.matrix import svd
import pymysql.cursors
import py_eureka_client.eureka_client as eureka_client

# Create your views here.
# mysql 연결
conn = pymysql.connect(host='j6c203.p.ssafy.io', port=3306,
                       user='escape', password='escape', db='escape', charset='utf8')
curs = conn.cursor()


@api_view(['GET'])
def index(request):
    
    eureka_client.init(eureka_server="http://j6c203.p.ssafy.io:8761",
                        app_name="ANALYSIS-SERVER",
                        instance_port= 8083)

    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.review

    temp_genre = '로맨스'
    temp_id = 1

    # cb 코드
    themes = theme.find()
    results = cb(temp_genre, themes)

    # cf 코드
    # themes = theme.find()
    # reviews = review.find()
    # results = cf(temp_genre, reviews, themes)

    # svd 코드
    # themes = theme.find()
    # reviews = review.find()
    # results = svd(temp_id, reviews, themes)

    context = {
        'results': results,
    }

    return render(request, 'recoapp/index.html', context)


@api_view(['GET'])
def CB(request, id, genre):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme

    themes = theme.find()

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    new_genre = genre

    if genre == "SF판타지":
        new_genre = "SF/판타지"
    elif genre == "모험액션":
        new_genre = "모험/액션"
    elif genre == "감성드라마":
        new_genre = "감성/드라마"

    results = cb(new_genre, themes)

    # mysql에 데이터 전달
    sql = "select user_id from recommend_genre where user_id=%s"
    curs.execute(sql, (id))

    row = curs.fetchall()

    if(not row):
        sql = "insert into recommend_genre(user_id, genre_one, genre_two, genre_three, genre_four, genre_five, genre_six) values(%s,%s,%s,%s,%s,%s,%s)"
        curs.execute(sql, (int(id), int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5])))
        conn.commit()
    else:
        sql = "update recommend_genre set genre_one=%s, genre_two=%s, genre_three=%s, genre_four=%s, genre_five=%s, genre_six=%s where user_id=%s"
        curs.execute(sql, (int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5]), int(id)))
        conn.commit()

    return Response('success')


@api_view(['GET'])
def CF(request, id, genre):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.review

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    new_genre = genre

    if genre == "SF판타지":
        new_genre = "SF/판타지"
    elif genre == "모험액션":
        new_genre = "모험/액션"
    elif genre == "감성드라마":
        new_genre = "감성/드라마"

    themes = theme.find()
    reviews = review.find()

    # n = len(list(review.find({'userId': id})))
    # if n >= 5:
    #     results = svd(id, reviews, themes)
    # else:
    results = cf(new_genre, reviews, themes)

    # mysql에 데이터 전달
    sql = "select user_id from recommend_like where user_id=%s"
    curs.execute(sql, (id))

    row = curs.fetchall()

    if(not row):
        sql = "insert into recommend_like(user_id, like_one, like_two, like_three, like_four, like_five, like_six) values(%s,%s,%s,%s,%s,%s,%s)"
        curs.execute(sql, (int(id), int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5])))
        conn.commit()
    else:
        sql = "update recommend_like set like_one=%s, like_two=%s, like_three=%s, like_four=%s, like_five=%s, like_six=%s  where user_id=%s"
        curs.execute(sql, (int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5]), int(id)))
        conn.commit()

    return Response('success')


@api_view(['GET'])
def CF2(request, id, genre, gender, age):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.review

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    if gender not in ['남', '여']:
        return

    if age not in [10, 20, 30, 40]:
        return

    new_genre = genre

    if genre == "SF판타지":
        new_genre = "SF/판타지"
    elif genre == "모험액션":
        new_genre = "모험/액션"
    elif genre == "감성드라마":
        new_genre = "감성/드라마"

    # temp_genre = '로맨스'
    themes = theme.find()
    reviews = review.find({"gender": gender, 'age': age})
    results = cf(new_genre, reviews, themes)

    # mysql에 데이터 전달
    sql = "select user_id from recommend_gender_age where user_id=%s"
    curs.execute(sql, (id))

    row = curs.fetchall()

    if(not row):
        sql = "insert into recommend_gender_age(user_id, gender_age_one, gender_age_two, gender_age_three, gender_age_four, gender_age_five, gender_age_six) values(%s,%s,%s,%s,%s,%s,%s)"
        curs.execute(sql, (int(id), int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5])))
        conn.commit()
    else:
        sql = "update recommend_gender_age set gender_age_one=%s, gender_age_two=%s, gender_age_three=%s, gender_age_four=%s, gender_age_five=%s, gender_age_six=%s  where user_id=%s"
        curs.execute(sql, (int(results[0]), int(results[1]), int(
            results[2]), int(results[3]), int(results[4]), int(results[5]), int(id)))
        conn.commit()

    return Response('success')
