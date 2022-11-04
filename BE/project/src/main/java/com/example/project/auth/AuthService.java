package com.example.project.auth;

import com.example.project.member.entity.Member;
import com.example.project.member.repository.MemberRepository;
import com.example.project.refreshtoken.RefreshToken;
import com.example.project.refreshtoken.RefreshTokenRepository;
import com.example.project.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;


    public void logoutMember(String refreshToken) {
        // 토큰이 있는지 확인한 후 삭제
        RefreshToken findToken = checkExistToken(refreshToken);
        refreshTokenRepository.delete(findToken);
    }

    public String reIssueAccessToken(String refreshToken){

        verifyExistToken(refreshToken);
        Member member = findTokenOwner(refreshToken);

        return delegateAccessToken(member);
    }

    public String reIssueRefreshToken(String refreshToken){

        verifyExistToken(refreshToken);
        Member member = findTokenOwner(refreshToken);
        refreshTokenRepository.deleteRefreshTokenByTokenValue(refreshToken);

        String reIssueRefreshToken = delegateRefreshToken(member);
        RefreshToken refreshToken1 = new RefreshToken(reIssueRefreshToken, member.getEmail(), member.getMemberId());

        refreshTokenRepository.save(refreshToken1);

        return reIssueRefreshToken;
    }

    private RefreshToken checkExistToken(String refreshToken) {
        return refreshTokenRepository
                .findRefreshTokenByTokenValue(refreshToken)
                .orElseThrow(() -> new RuntimeException());
    }

    private void verifyExistToken(String refreshToken){
        Optional<RefreshToken> optionalRefreshToken =
                refreshTokenRepository.findRefreshTokenByTokenValue(refreshToken);

        if(!optionalRefreshToken.isPresent())
            throw new RuntimeException();
    }

    private Member findTokenOwner(String refreshToken){
        long memberId = refreshTokenRepository.findRefreshTokenByTokenValue(refreshToken)
                .get().getMemberId();

        Optional<Member> findMember = memberRepository.findById(memberId);
        return findMember.orElseThrow(()-> new RuntimeException());
    }

    private String delegateAccessToken(Member member) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    /**
     * RefreshToken 생성 로직
     * @Param 인증된 Authentication의 principal field에서 찾아온 member정보
     * @Return RefreshToken
     */
    private String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        return refreshToken;
    }
}
