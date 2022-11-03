package com.example.project.auth;

import com.example.project.refreshtoken.RefreshToken;
import com.example.project.refreshtoken.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RefreshTokenRepository refreshTokenRepository;

    public void logoutMember(String refreshToken) {
        // 토큰이 있는지 확인한 후 삭제
        RefreshToken findToken = checkExistToken(refreshToken);
        refreshTokenRepository.delete(findToken);
    }

    private RefreshToken checkExistToken(String refreshToken) {
        return refreshTokenRepository
                .findRefreshTokenByTokenValue(refreshToken)
                .orElseThrow(() -> new RuntimeException());
    }
}
