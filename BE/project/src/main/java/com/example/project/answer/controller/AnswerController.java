package com.example.project.answer.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.mapper.AnswerMapper;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.SingleResponseDto;
import com.example.project.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/questions")
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 기능 : answer 등록
     * @param request - header에서 토큰을 추출하여 로그인 유저 이메일을 알기 위함 - 이하 동문
     */
    @PostMapping("/{questionId}/answers")
    public ResponseEntity postAnswer(HttpServletRequest request,
                                     @PathVariable long questionId,
                                     @Valid @RequestBody AnswerDto.Post requestBody){

        String memberEmail = extractMemberEmail(request);

        Answer answer = mapper.answerPostToAnswer(requestBody);

        Answer createdAnswer = answerService.createAnswer(answer, questionId, memberEmail);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(createdAnswer)), HttpStatus.CREATED
        );
    }

    /**
     * 기능 : answer 수정
     */
    @PatchMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity patchAnswer(HttpServletRequest request,
                                      @PathVariable long questionId,
                                      @PathVariable long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestBody){

        String memberEmail = extractMemberEmail(request);

        Answer answer = answerService.updateAnswer(mapper.answerPatchToAnswer(requestBody),
                memberEmail);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)), HttpStatus.OK
        );
    }

    /**
     * 기능 : answer 추천 up
     * 한번 누르면 up, 두번 누르면 down됨.
     */
    @PatchMapping("/{questionId}/answers/vote_up/{answerId}")
    public ResponseEntity patchAnswerVoteUp(HttpServletRequest request,
                                            @PathVariable long questionId,
                                            @PathVariable long answerId,
                                            @Valid @RequestBody AnswerDto.AnswerVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);

        Answer answer = answerService.answerVoteUp(mapper.answerVoteDtoToAnswer(requestBody), memberEmail);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToVoteResponse(answer)), HttpStatus.OK
        );
    }

    /**
     * 기능 : answer 추천 down
     * 한번 누르면 down, 두번 누르면 up됨.
     */
    @PatchMapping("/{questionId}/answers/vote_down/{answerId}")
    public ResponseEntity patchAnswerVoteDown(HttpServletRequest request,
                                              @PathVariable long questionId,
                                              @PathVariable long answerId,
                                              @Valid @RequestBody AnswerDto.AnswerVotePatch requestBody){

        String memberEmail = extractMemberEmail(request);

        Answer answer = answerService.answerVoteDown(mapper.answerVoteDtoToAnswer(requestBody), memberEmail);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToVoteResponse(answer)), HttpStatus.OK);
    }


    /** todo ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅅㅁㄴㅇ13616146
     * 기능 : answer 채택
     */
    @PatchMapping("/{questionId}/answers/accept/{answerId}")
    public ResponseEntity patchAnswerAccept(HttpServletRequest request,
                                            @PathVariable long questionId,
                                            @PathVariable long answerId,
                                            @Valid @RequestBody AnswerDto.AcceptPatch requestBody){

        String memberEmail = extractMemberEmail(request);

        Answer answer = answerService.acceptAnswer(mapper.answerAcceptToAnswer(requestBody), memberEmail, questionId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAcceptResponse(answer)), HttpStatus.OK
        );
    }

    /**
     * 기능 : answer 삭제
     */
    @DeleteMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity deleteAnswer(HttpServletRequest request,
                                       @PathVariable long questionId,
                                       @PathVariable long answerId){

        String memberEmail = extractMemberEmail(request);

        answerService.deleteAnswer(answerId, memberEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 메서드 : email정보를 추출한다.
     * @return request 헤더의 토큰에서 추출한 로그인 유저의 email정보
     */
    private String extractMemberEmail(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody().getSubject();
    }
}

