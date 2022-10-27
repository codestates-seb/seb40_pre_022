package com.example.project.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_EXISTS(409, "Question exists"),
    ANSWER_NOT_FOUND(404, "Answer not found");

    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
