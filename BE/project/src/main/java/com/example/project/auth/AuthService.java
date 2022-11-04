package com.example.project.auth;

import com.example.project.exception.BusinessLogicException;
import com.example.project.exception.ExceptionCode;
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

    /**
     * 필수) 로그아웃
     * 1. 토큰의 존재유무 확인 후 토큰을 가져온다.
     * 2. 삭제한다.
     */
    public void logoutMember(String refreshToken) {
        RefreshToken findToken = checkExistToken(refreshToken);
        refreshTokenRepository.delete(findToken);
    }

    /**
     * 필수) 액세스토큰 재발급
     * 1. 토큰의 존재 유무를 파악한다.
     * 2. 토큰의 주인을 찾는다.
     * 3. 새로운 액세스토큰을 만든다.
     */
    public String reIssueAccessToken(String refreshToken){

        verifyExistToken(refreshToken);
        Member member = findTokenOwner(refreshToken);

        return delegateAccessToken(member);
    }

    /**
     * 팔수) 리프레시토큰 재발급
     * 1. 토큰의 존재 유무를 파악한다.
     * 2. 토큰의 주인을 찾는다.
     * 3. 현재의 토큰을 테이블에서 삭제한다.
     * 4. 새로운 토큰을 생성한다.
     * 5. 데이터베이스에 생성된 토큰을 저장한다.
     */
    public String reIssueRefreshToken(String refreshToken){

        verifyExistToken(refreshToken);
        Member member = findTokenOwner(refreshToken);
        refreshTokenRepository.deleteRefreshTokenByTokenValue(refreshToken);

        String reIssueRefreshToken = delegateRefreshToken(member);

        RefreshToken refreshToken1 = new RefreshToken(reIssueRefreshToken, member.getEmail(), member.getMemberId());
        refreshTokenRepository.save(refreshToken1);

        return reIssueRefreshToken;
    }

    /**
     * 도구) 토큰을 찾아 반환하는 메서드. 없으면 에러
     * @param refreshToken
     * @return
     */
    private RefreshToken checkExistToken(String refreshToken) {
        return refreshTokenRepository
                .findRefreshTokenByTokenValue(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }

    /**
     * 도구) 토큰의 존재 여부를 판단하여 없으면 에러메시지를 던지는 메서드
     */
    private void verifyExistToken(String refreshToken){
        Optional<RefreshToken> optionalRefreshToken =
                refreshTokenRepository.findRefreshTokenByTokenValue(refreshToken);

        if(!optionalRefreshToken.isPresent())
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND);
    }

    /**
     * 도구) 토큰의 주인을 찾는 메서드
     * 1. 토큰테이블을 검색하여 멤버아이디를 찾는다.
     * 2. 멤버아이디로 멤버를 찾아 리턴한다.
     */
    private Member findTokenOwner(String refreshToken){
        long memberId = refreshTokenRepository.findRefreshTokenByTokenValue(refreshToken)
                .get().getMemberId();

        Optional<Member> findMember = memberRepository.findById(memberId);
        return findMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    /**
     * 도구) AccessToken 생성 메서드
     * @Param 인증된 Authentication의 principal field에서 찾아온 member정보
     * @Return String RefreshToken
     */
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
     * 도구) RefreshToken 생성 메서드
     * @Param 인증된 Authentication의 principal field에서 찾아온 member정보
     * @Return String RefreshToken
     */
    private String delegateRefreshToken(Member member) {

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
        return refreshToken;
    }
}
