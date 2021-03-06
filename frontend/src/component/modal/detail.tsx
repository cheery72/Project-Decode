import { useState } from 'react';
import { Button, Header, Modal, Rating } from 'semantic-ui-react'
import Reviewboard from '../board/reviewboard';
import Kakaomap from '../kakaomap/kmap';

export default function Detail({item, isImage, w, h}: any){

    const [open, setOpen] = useState(false)

    return (
        <>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={isImage?
                    <button style={{ backgroundColor: "white", border: "white", cursor: "pointer"}}><img src={item.url} alt="url" width={w} height={h} /></button>
                :
                    <Button>{item.name}</Button>
                }
                >
                <Modal.Content image>
                    <img src="https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC)/theme__%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A1%E1%84%85%E1%85%A1%E1%86%BC-%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC).jpg" alt="이미지가 없습니다" width="250px" height="350px"/>
                    {/* <Image size='medium' src='https://next-edition.s3.amazonaws.com/theme/title_image_url/%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC)/theme__%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A1%E1%84%85%E1%85%A1%E1%86%BC-%E1%84%91%E1%85%A9%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5_%EC%99%84%EC%A0%84%ED%95%9C%EC%82%AC%EB%9E%91(%EB%A6%AC%EB%89%B4%EC%96%BC).jpg' wrapped /> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Modal.Description>
                        <Header as='h2'>{item.name}</Header>
                        <Header as='h3'>난이도 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Rating icon='heart' defaultRating={item.difficulty} maxRating={item.difficulty} /></Header>
                        <Header as='h3'>장르 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.genre}</Header>
                        <Header as='h3'>추천 인원 &nbsp;&nbsp;&nbsp;&nbsp; {item.reco_person}명</Header>
                        <Header as='h3'>최대 인원 &nbsp;&nbsp;&nbsp;&nbsp; {item.max_person}명</Header>
                        <Header as='h3'>시간 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {item.time}분</Header>
                    </Modal.Description>
                    <Modal.Description />
                    <Modal.Description>
                        <br />
                        <h3>지점 명</h3>
                        <Kakaomap latitude={33.450701} longitude={126.570667}/>
                        <br />
                        <p>예약 홈페이지 주소</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <br />
                    <Reviewboard />
                    <br />
                    <Button 
                        content='close'
                        color='red'
                        onClick={() => setOpen(false)}>
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}