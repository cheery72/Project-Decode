package com.ssafy.authsvr.entity;

import com.ssafy.authsvr.oauth.domain.ProviderType;
import com.ssafy.authsvr.oauth.domain.RoleType;
import com.ssafy.authsvr.payload.request.UserProfileRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private Integer id;

    private String email;

    private String image;

    @Enumerated(EnumType.STRING)
    private ProviderType providerType;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private String tokenId;

    private String nickName;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String gender;

    private Integer age;

    private String largeRegion;

    private String smallRegion;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_preference_id")
    private GenrePreference genrePreference;

    public User(Integer id, String tokenId, String name, String email, String image, ProviderType providerType,
                RoleType roleType, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.id = id;
        this.tokenId = tokenId;
        this.name = name;
        this.email = email == null ? "NO_EMAIL" : email;
        this.image = image;
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.nickName = name;
        this.modifiedAt = modifiedAt;
    }

    public void setUserProfileImageModified(String image) {
        this.image = image;
    }

    public void setUserNameModified(String name) {
        this.name = name;
    }

    public void setUserGenreInfo(UserProfileRequest profileRequest,GenrePreference genrePreference, String imageUrl) {
        this.nickName = profileRequest.getNickName();
        this.age = profileRequest.getAge();
        this.gender = profileRequest.getGender();
        this.largeRegion = profileRequest.getLargeRegion();
        this.smallRegion = profileRequest.getSmallRegion();
        this.genrePreference = genrePreference;
        this.image = imageUrl;
    }

}