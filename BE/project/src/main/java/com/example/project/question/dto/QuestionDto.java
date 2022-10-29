package com.example.project.question.dto;

import com.example.project.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
// 수정 - private 지정자 : ver 1.1
public class QuestionDto {

    //질문 수정시 사용될 patchDto - checked
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPatchDto {

        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> questionTags;

    }

    //질문 작성시 사용될 PostDto - checked
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPostDto {

        private String title;
        private String body;
        private List<QuestionTagDto> questionTags;

    }

    //질문 추천시 사용될 patchDto - checked
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendPatchDto {

        private long questionId;
        private int voteCount;

    }

    //질문 개별페이지(상세페이지)에 응답할 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponseDto {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto questionMemberDto;  // * 놓치지 말 것 (mapper에서 name, email, image userStatus만 담아야함 -> 생성자생성)
//        private MultiResponseDto<Answer> answers;
        private List<Answer> answers;
        private List<QuestionTagDto> questionTags;  // * 놓치지 말 것 (mapper에서 tagName만 담아야함 -> 생성자 생성)
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    //질문 목록에 응답할 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionListResponseDto {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        private QuestionMemberDto questionMemberDto; // * mapper에서 name, email, image만 담아야 함 -> 생성자 생성)
        private List<QuestionTagDto> questionTags; // tagName만 가져오기
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    // 질문 수정을 위한 responseDto - 수정창

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionForUpdateResponseDto {

        private long questionId;
        private String title;
        private String body;
        private List<QuestionTagDto> questionTags; // name만 골라오기.

    }

    //질문 추천 비추천 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendResponseDto {

        private long voteCount;

    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionTagDto{
        private String questionTagName;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionMemberDto{
        private String name;
        private String email;
        private String imgae;
    }
}
