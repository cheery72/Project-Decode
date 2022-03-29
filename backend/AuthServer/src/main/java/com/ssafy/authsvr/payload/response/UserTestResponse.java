package com.ssafy.authsvr.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTestResponse {
    private String image;

    private Integer romance;
}
