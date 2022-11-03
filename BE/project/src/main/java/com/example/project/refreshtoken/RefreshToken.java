package com.example.project.refreshtoken;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @class 로그아웃을 위한 리프레시 토큰 엔티티
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "REFRESH_TOKEN_ID")
    private long refreshTokenId;

    @Column(name = "TOKEN_VALUE")
    private String tokenValue;

    @Column(name = "TOKEN_EMAIL")
    private String tokenEmail;

    @Column(name = "TOKEN_ID")
    private long tokenId;

    public RefreshToken(String tokenValue, String tokenEmail, long tokenId) {
        this.tokenValue = tokenValue;
        this.tokenEmail = tokenEmail;
        this.tokenId = tokenId;
    }
}
