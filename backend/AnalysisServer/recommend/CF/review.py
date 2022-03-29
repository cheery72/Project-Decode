import pandas as pd
import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity

with open("recommend/CF/reviews2.json", encoding="utf-8-sig") as fp:
  data = json.loads(''.join(line.strip() for line in fp))

# 유저 리뷰 정보
reviews = pd.json_normalize(data)
# print(reviews)

# 테마 정보
theme = pd.read_csv("recommend/CF/theme.csv", encoding = 'cp949')
print(theme)

# 테마 유저 리뷰 정보 병합
user_theme_rating = pd.merge(reviews, theme, on = 'themeId')

# 테이블 생성 및 빈칸 0으로 채우기
theme_user_rating = user_theme_rating.pivot_table('rating', index='theme_name', columns='userId')
theme_user_rating = theme_user_rating.fillna(0)
# print(user_theme_rating)

# 코사인 유사도 사용
item_based_collabor = cosine_similarity(theme_user_rating)
print(item_based_collabor)

# 테이블로 형태 변경
item_based_collabor2 = pd.DataFrame(data = item_based_collabor, index = theme_user_rating.index, columns = theme_user_rating.index)
print(item_based_collabor2)

# 함수 생성
def get_item_based_collabor(title):
  return item_based_collabor2[title].sort_values(ascending=False)[:20]

# 결과 찾기
# print(get_item_based_collabor('히말라야'))
