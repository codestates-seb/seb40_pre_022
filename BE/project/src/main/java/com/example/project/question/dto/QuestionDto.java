package com.example.project.question.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
// 수정 - private 지정자 : ver 1.1
public class QuestionDto {

    //질문 수정시 사용될 patchDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPatchDto {

        private long questionId;
        private String title;
        private String body;
        private List<String> tags;

    }

    //질문 작성시 사용될 PostDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionPostDto {

        private String title;
        private String body;
        private List<String> tags;

    }

    //질문 추천시 사용될 patchDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendPatchDto {

        private long questionId;
        private int vote;

    }

    //질문관련하여 응답할 responseDto
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponseDto {

        private long questionId;
        private String title;
        private String body;
        private int voteCount;
        private int viewCount;
        //Member member;
        //List<Question_tag> tags;
        //List<Answer> answer;
    }

    //질문
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecommendResponseDto {

        private int vote;

    }
}
