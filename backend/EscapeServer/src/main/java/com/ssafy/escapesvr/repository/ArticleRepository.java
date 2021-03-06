package com.ssafy.escapesvr.repository;

import com.ssafy.escapesvr.entity.Article;
import com.ssafy.escapesvr.repository.querydsl.SearchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ArticleRepository extends JpaRepository<Article, Long> , SearchRepository {

    Page<Article> findByUserId(Integer userId, Pageable pageable);

    Page<Article> findAll(Pageable pageable);

}
