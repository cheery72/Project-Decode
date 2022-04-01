import pymysql.cursors
import pymongo
import sys
from .recoapp.recommend.content import cb
from .recoapp.recommend.review import cf

def crontab():
    conn = pymysql.connect(host='j6c203.p.ssafy.io', port=3306,
                       user='escape', password='escape', db='escape', charset='utf8')
    curs = conn.cursor()
    
    sql = "select genre_preference_id,user_id,gender,age from user"
    curs.execute(sql, ())
    result = curs.fetchall()

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    for x,y,k,z in result:
        if x == None: continue

        sql = "select * from genre_preference where genre_preference_id = %s"
        curs.execute(sql, (x))

        preference = curs.fetchall()
        max_preperence = max(preference[0][1:])
        genre = genre_name[preference[0][1:].index(max_preperence)]
        print(x,y,k,z)
        CB(x,genre)

        # CF(x,genre)
        
        # if k == None or z == None: continue
        # CF2(x,genre,k,z)

def CB(id, genre):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme

    conn = pymysql.connect(host='j6c203.p.ssafy.io', port=3306,
                       user='escape', password='escape', db='escape', charset='utf8')
    curs = conn.cursor()

    themes = theme.find()

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    results = cb(genre, themes)

    # genre_one, genre_two, genre_three, genre_four, genre_five, genre_six

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

    return 


def CF(id, genre):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.review


    conn = pymysql.connect(host='j6c203.p.ssafy.io', port=3306,
                       user='escape', password='escape', db='escape', charset='utf8')
    curs = conn.cursor()
    

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    # temp_genre = '로맨스'
    themes = theme.find()
    reviews = review.find()
    results = cf(genre, reviews, themes)

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

    return 


def CF2(id, genre, gender, age):
    theme = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.theme
    review = pymongo.MongoClient("j6c203.p.ssafy.io", 27017).escape.review


    conn = pymysql.connect(host='j6c203.p.ssafy.io', port=3306,
                       user='escape', password='escape', db='escape', charset='utf8')
    curs = conn.cursor()
    

    genre_name = ["스릴러", "로맨스", "추리", "SF판타지",
                  "모험액션", "코미디", "범죄", "공포", "19금", "감성드라마"]

    if genre not in genre_name:
        return

    if gender not in ['남', '여']:
        return

    if age not in [10, 20, 30, 40]:
        return

    # temp_genre = '로맨스'
    themes = theme.find()
    reviews = review.find({"gender": gender, 'age': age})
    results = cf(genre, reviews, themes)

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

    return 


if __name__ == '__main__':

    crontab()
