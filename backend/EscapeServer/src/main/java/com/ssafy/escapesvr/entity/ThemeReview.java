package com.ssafy.escapesvr.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThemeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_review_id")
    private Integer id;

    @NotNull
    private Integer userId;

    @NotNull
    private String userNickName;

    @NotNull
    private double reviewScore;

    @NotNull
    private String reviewContent;

    @NotNull
    private Integer clearTime;

    @NotNull
    private LocalDate createdAt;

    private LocalDate modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id")
    private Theme theme;

}
