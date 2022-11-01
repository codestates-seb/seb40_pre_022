package com.example.project.answer.controller;

import com.example.project.answer.dto.AnswerDto;
import com.example.project.answer.entity.Answer;
import com.example.project.answer.mapper.AnswerMapper;
import com.example.project.answer.service.AnswerService;
import com.example.project.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/questions")
@Validated
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;

    // 1. 답변 등록
    @PostMapping("/{questionId}/answers")
    public ResponseEntity postAnswer(@PathVariable long questionId,
            @Valid @RequestBody AnswerDto.Post requestBody){
        requestBody.setQuestionId(questionId);
        Answer answer = mapper.answerPostToAnswer(requestBody);

        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerDto.Response response = mapper.answerToAnswerResponse(createdAnswer);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    // 2. 답변 수정
    @PatchMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity patchAnswer(@PathVariable long questionId,
                                      @PathVariable long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestBody){
        requestBody.setAnswerId(answerId);
        Answer answer = answerService.updateAnswer(
                mapper.answerPatchToAnswer(requestBody),
                requestBody.getMemberId()       // 지금 수정하려는 사람의 memberId.
                );

        AnswerDto.Response response = mapper.answerToAnswerResponse(answer);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    // Answer get test용입니다. 구현대상 X

    @GetMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity getAnswer(@PathVariable long questionId,
                                    @PathVariable long answerId){
        Answer answer = answerService.findAnswer(answerId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAnswerResponse(answer)),
                HttpStatus.OK
        );
    }

    // 3. 답변 추천 up
    @PatchMapping("/{questionId}/answers/vote_up/{answerId}")
    public ResponseEntity patchAnswerVoteUp(@PathVariable long questionId,
                                          @PathVariable long answerId,
                                          @Valid @RequestBody AnswerDto.AnswerVotePatch requestBody){

        Answer answer = answerService.answerVoteUp(mapper.answerVoteDtoToAnswer(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToVoteResponse(answer)), HttpStatus.OK
        );
    }

    // 4. 답번 비추천 down
    @PatchMapping("/{questionId}/answers/vote_down/{answerId}")
    public ResponseEntity patchAnswerVoteDown(@PathVariable long questionId,
                                            @PathVariable long answerId,
                                            @Valid @RequestBody AnswerDto.AnswerVotePatch requestBody){

        Answer answer = answerService.answerVoteDown(mapper.answerVoteDtoToAnswer(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToVoteResponse(answer)), HttpStatus.OK
        );
    }


    // 5. 답변 채택
    @PatchMapping("/{questionId}/answers/accept/{answerId}")
    public ResponseEntity patchAnswerAccept(@PathVariable long questionId,
                                           @PathVariable long answerId,
                                           @Valid @RequestBody AnswerDto.AcceptPatch requestBody){

        requestBody.setAnswerId(answerId);
        requestBody.setQuestionId(questionId);

        Answer answer = answerService.acceptAnswer(mapper.answerAcceptToAnswer(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.answerToAcceptResponse(answer)), HttpStatus.OK
        );
    }

    // 6. 답변 삭제
    @DeleteMapping("/{questionId}/answers/{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable long questionId,
                                       @PathVariable long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
