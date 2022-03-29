package com.ssafy.authsvr.repository;

import com.ssafy.authsvr.entity.User;
import com.ssafy.authsvr.payload.response.UserDetailProfileResponse;
import com.ssafy.authsvr.payload.response.UserTestResponse;
import org.hibernate.annotations.NamedNativeQuery;
import org.hibernate.sql.Select;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByTokenId(String tokenId);

    Integer countAllBy();

//    @Query(value = " select u.image,g.romance " +
//            " FROM User u"+
//            " INNER Join GenrePreference g " +
//            " on u.genre_preference_id = g.genre_preference_id" +
//            " where u.user_id = :userId"
//            ,nativeQuery = true)
//    UserTestResponse findUserPreferenceBy(Integer userId);
}