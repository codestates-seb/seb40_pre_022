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

    // 1. 답변 등록
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

    // 2. 답변 수정
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

    // 3. 답변 추천 up
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

    // 4. 답번 비추천 down
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


    // 5. 답변 채택
    @PatchMapping("/{questionId}/answers/accept/{answerId}")
    public ResponseEntity patchAnswerAccept(HttpServletRequest request,
                                            @PathVariable long questionId,
                                            @PathVariable long answerId,
                                            @Valid @RequestBody AnswerDto.AcceptPatch requestBody){

        String memberEmail = extractMemberEmail(request);

        requestBody.setAnswerId(answerId);
        requestBody.setQuestionId(questionId);

        Answer answer = answerService.acceptAnswer(mapper.answerAcceptToAnswer(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAcceptResponse(answer)), HttpStatus.OK
        );
    }

    // 6. 답변 삭제
    @DeleteMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity deleteAnswer(HttpServletRequest request,
                                       @PathVariable long questionId,
                                       @PathVariable long answerId){

        String memberEmail = extractMemberEmail(request);

        answerService.deleteAnswer(answerId, memberEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private String extractMemberEmail(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody().getSubject();
    }
}

