<<<<<<< HEAD
import { Grid, Header } from "semantic-ui-react";
// import Region from "../../src/component/filter/region";
// import Detail from "../../src/component/modal/detail";
=======
import { useEffect, useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import Detail from "../../src/component/modal/detail";
import IsLogin from "../../src/lib/customLogin";
import getrecoAxios from "../../src/lib/getrecoAxios";
import userAxios from "../../src/lib/userAxios";
import styles from "../../styles/recommend/recommend.module.css";

>>>>>>> FE

export default function Recommend(){

    const [userInfo, setUserInfo]: any = useState([])
    const [myRecommend, setMyRecommend]: any = useState([])
    const [ageRecommend, setAgeRecommend]: any = useState([])
    const [genreRecommend, setGenreRecommend]: any = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    useEffect(() => {
        loadMyRecommend()
        loadAgeRecommend()
        loadgenreRecommend()
    }, [userInfo.id])

    const loadUser = async () => {
    if (IsLogin()){
            userAxios.get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                alert('로그인 시간이 만료되었습니다.')
            })
        }
    } 

    const loadMyRecommend = async () => {
        if(userInfo.id){
            getrecoAxios.get(`/recommend/like/${userInfo.id}`)
            .then(({ data }) => {
                setMyRecommend(data)
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }


    const loadAgeRecommend = async () => {
        if(userInfo.id){
            getrecoAxios.get(`/recommend/genderAge/${userInfo.id}`)
            .then(({ data }) => {
                setAgeRecommend(data)
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }

    const loadgenreRecommend = async () => {
        if(userInfo.id){
            getrecoAxios.get(`/recommend/genre/${userInfo.id}`)
            .then(({ data }) => {
                setGenreRecommend(data)
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <>
            <Grid stackable>
                {userInfo.id?
                <>
                <Grid.Row>
                    <Grid.Column width={2}/>
<<<<<<< HEAD
                    <Grid.Column width={12}>
                        {/* <Region /> */}
=======
                    <Grid.Column width={3}>
                        <Header as='h3'>방탈출 추천 서비스입니다. <Icon color="yellow" name='key'/></Header> 
                        <br />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header as='h3'>마음에 드는 테마를 찾아보세요! <Icon color="red" name='heart'/></Header> 
                        <br />
>>>>>>> FE
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
<<<<<<< HEAD
                        {/* <Header as='h3'>'유저' 님이 좋아하실만한 테마를 준비해봤어요!</Header> */}
                        {/* <Detail item={thema} isImage={true} w={150} h={200}/> */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <Detail item={thema} isImage={true} w={150} h={200}/> */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <Detail item={thema} isImage={true} w={150} h={200}/> */}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <Detail item={thema} isImage={true} w={150} h={200}/> */}
=======
                        <Header as='h3'><span className={styles.color}>{userInfo.nick_name}</span> 님이 좋아하실만한 <span className={styles.color}>테마</span>를 준비해봤어요!</Header>
                        <Detail themeId={myRecommend.like_one} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={myRecommend.like_two} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={myRecommend.like_three} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={myRecommend.like_four} isImage={true} w={150} h={200}/>
>>>>>>> FE
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
<<<<<<< HEAD
                        {/* <Header as='h3'>'유저' 님이 좋아하실만한 테마를 준비해봤어요!</Header> */}
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/MEMORY%20-%20Episode%201/theme__%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5-%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5-%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC_%E1%84%8C%E1%85%A5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%85%E1%85%A3%E1%86%BC__MEMORY%20-%20Episode%201.jpg" alt="맞춤추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC)/theme__%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A1%E1%84%85%E1%85%A1%E1%86%BC-%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC).jpg" alt="맞춤추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%ED%9D%90%EB%A6%B0%EB%82%A0/theme__%E1%84%92%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%AF_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%ED%9D%90%EB%A6%B0%EB%82%A0.jpg" alt="맞춤추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%B9%B4%EB%A5%B4%ED%85%94/theme__%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2019-03-11_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_1.01.28_%EC%B9%B4%EB%A5%B4%ED%85%94.jpg" alt="맞춤추천" height="200px" width="150px" />
=======
                        <Header as='h3'><span className={styles.color}>{userInfo.nick_name}</span> 님과 같은 <span className={styles.color}>{userInfo.age}대 {userInfo.gender==='남'?"남자":"여자"}</span>들이 좋아하는 방에 도전해보세요!</Header>
                        <Detail themeId={ageRecommend.gender_age_one} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={ageRecommend.gender_age_two} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={ageRecommend.gender_age_three} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={ageRecommend.gender_age_four} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
>>>>>>> FE
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
<<<<<<< HEAD
                        {/* <Header as='h3'>'유저' 님과 같은 '20'대 '여성'들이 좋아하는 방에 도전해보세요!</Header> */}
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%A0%80%EB%8B%88(JOURNEY)/theme__%E1%84%8C%E1%85%A5%E1%84%82%E1%85%B5_%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC_%EC%A0%80%EB%8B%88(JOURNEY).jpg" alt="연령추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%ED%80%B4%EC%A6%88%20%EC%9D%B8%20%EB%8D%94%20%EB%85%B8%EB%B8%94%20(Quiz%20in%20The%20Noble)/theme__%E1%84%8F%E1%85%B1%E1%84%8C%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%A5%E1%84%82%E1%85%A9%E1%84%87%E1%85%B3%E1%86%AF_%ED%80%B4%EC%A6%88%20%EC%9D%B8%20%EB%8D%94%20%EB%85%B8%EB%B8%94%20(Quiz%20in%20The%20Noble).jpg" alt="연령추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%BB%A4%EB%84%A5%ED%8A%B8%20(Connect)/theme__%E1%84%8F%E1%85%A5%E1%84%82%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%EC%BB%A4%EB%84%A5%ED%8A%B8%20(Connect).jpg" alt="연령추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%B2%AB%EB%A7%8C%EB%82%A8/theme__%E1%84%8E%E1%85%A5%E1%86%BA%E1%84%86%E1%85%A1%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%EC%B2%AB%EB%A7%8C%EB%82%A8.jpg" alt="연령추천" height="200px" width="150px" />
=======
                        <Header as='h3'><span className={styles.color}>{userInfo.nick_name}</span> 님이 좋아하는 <span className={styles.color}>장르</span>를 모아봤어요!</Header>
                        <Detail themeId={genreRecommend.genre_one} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={genreRecommend.genre_two} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={genreRecommend.genre_three} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Detail themeId={genreRecommend.genre_four} isImage={true} w={150} h={200}/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
>>>>>>> FE
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
                </>:
                <Grid.Row>
<<<<<<< HEAD
                    <Grid.Column width={2}/>
                    <Grid.Column width={12}>
                        {/* <Header as='h3'>'유저' 님이 좋아하는 '추리'장르를 모아봤어요!</Header> */}
                        <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/SOS/theme__SOS_%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC_%E1%84%8C%E1%85%A5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%85%E1%85%A3%E1%86%BC__SOS.jpg" alt="장르추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="http://red.doorescape.co.kr/upload/theme/theme51247_0.jpg" alt="장르추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="http://red.doorescape.co.kr/upload/theme/theme73755_0.jpg" alt="장르추천" height="200px" width="150px" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src="http://blue.doorescape.co.kr/upload/theme/theme06441_0.jpg" alt="장르추천" height="200px" width="150px" />
                    </Grid.Column>
                    <Grid.Column width={2}/>
=======
                    <Grid.Column width={2} />
                    <Grid.Column width={12}><Header as='h3'>추천 정보를 보시려면 로그인해주세요! <Icon color="yellow" name='id card'/></Header></Grid.Column>
                    <Grid.Column width={2} />
>>>>>>> FE
                </Grid.Row>
                }
            </Grid>
        </>
    );
}