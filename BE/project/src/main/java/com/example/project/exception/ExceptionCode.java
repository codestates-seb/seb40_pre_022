package com.example.project.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_EXISTS(409, "Question exists"),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ACCEPT_ANSWER_EXISTS(409, "Another answer accepted"),
    CANNOT_CHANGE_ANSWER(403, "Answer can not change"),
    CANNOT_CHANGE_MEMBER(403, "Member doesn't match"),
    TOKEN_NOT_FOUND(404, "Token not found"),
    COOKIE_NOT_FOUND(404, "Cookie not found");
    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
