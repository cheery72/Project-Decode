package com.ssafy.escapesvr.service;

import com.ssafy.escapesvr.client.UserServiceClient;
import com.ssafy.escapesvr.dto.ProfileRequestDto;
import com.ssafy.escapesvr.dto.SearchDto;
import com.ssafy.escapesvr.repository.querydsl.SearchRepository;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.escapesvr.dto.ArticleRequestDto;
import com.ssafy.escapesvr.dto.ArticleResponseDto;
import com.ssafy.escapesvr.entity.Article;
import com.ssafy.escapesvr.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;

    //private final SearchRepository searchRepository;

    private final UserServiceClient userServiceClient;

    //게시글 생성
    @Override
    @Transactional
    public ArticleResponseDto save(final ArticleRequestDto articleRequestDto) {

        Article article = new Article();

        try{
            ProfileRequestDto profileRequestDto = userServiceClient.userFindProfile(articleRequestDto.getUserId());
            article.setNickName(profileRequestDto.getNickName());
            article.setUserImage(profileRequestDto.getImage());
        }catch (FeignException e){
            e.printStackTrace();
        }

        article.setUserId(articleRequestDto.getUserId());
        article.setTitle(articleRequestDto.getTitle());
        article.setContent(articleRequestDto.getTitle());
        article.setSmallRegion(articleRequestDto.getSmallRegion());
        article.setCreatedAt(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime());
        article.setRecommend(0);
        article.setReport(0);

        article = articleRepository.save(article);

        return new ArticleResponseDto(article);

    }


    //게시글 전체 조회
    @Override
    public List<ArticleResponseDto> getAllArticle() {
        Sort sort = Sort.by(Direction.DESC, "id", "createdAt");
        List<Article> list = articleRepository.findAll(sort);
        return list.stream().map(ArticleResponseDto::new).collect(Collectors.toList());
    }


    //해당 게시물 조회
    @Override
    public ArticleResponseDto getArticle(Long id) {

        Article article = articleRepository.getById(id);
        ArticleResponseDto articleResponseDto = new ArticleResponseDto(article);

        return articleResponseDto;

    }



    //회원 별 게시물 조회
    @Override
    public Page<ArticleResponseDto> getMyArticleList(Integer userId, Pageable pageable) {


        Page<Article> myArticleList = articleRepository.findByUserId(userId,pageable);

        Page<ArticleResponseDto> myArticle=myArticleList.map( o-> new ArticleResponseDto(o.getId(),o.getTitle(), o.getContent(), o.getSmallRegion(), o.getRecommend(), o.getReport(), o.getUserId(), o.getCreatedAt(), o.getModifiedAt(), o.getNickName(), o.getUserImage()));

       // return myArticleList.stream().map(ArticleResponseDto::new).collect(Collectors.toList());

        return  myArticle;


    }


    @Override
    public List<ArticleResponseDto> postList(String smallRegion, SearchDto searchDto) {
        List<Article> articleList = articleRepository.findPageDynamicQuery(smallRegion, searchDto);
        return articleList.stream().map(ArticleResponseDto::new).collect(Collectors.toList());
    }

    //게시글 수정
    @Override
    @Transactional
    public ArticleResponseDto updateArticle(ArticleRequestDto articleRequestDto, Long id) {

        Article article = articleRepository.getById(id);

        article.setUserId(articleRequestDto.getUserId());
        article.setTitle(articleRequestDto.getTitle());
        article.setContent(articleRequestDto.getTitle());
        article.setSmallRegion(articleRequestDto.getSmallRegion());
        article.setCreatedAt(ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime());
        article.setRecommend(0);
        article.setReport(0);

        article = articleRepository.save(article);

        return new ArticleResponseDto(article);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {

        Article article = articleRepository.getById(id);

        //댓글 완성되면 연관 댓글도 삭제!

        articleRepository.deleteById(id);
    }

    // 추천 횟수 증가
    @Override
    @Transactional
    public Integer recommendArticle(Long id) {

        Article article = articleRepository.getById(id);

        article.setRecommend((article.getRecommend()+1));
        article = articleRepository.save(article);

        return article.getRecommend();

    }

    // 신고 횟수 증가
    @Override
    @Transactional
    public Integer reportArticle(Long id) {

        Article article = articleRepository.getById(id);

        article.setRecommend((article.getReport()+1));
        article = articleRepository.save(article);

        return article.getReport();

    }




}
