package com.example.project.vote.entity;

import com.example.project.answer.entity.Answer;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.util.HashMap;

public class Vote {

    // just for test

    @OneToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    // Todo
    // 1. HashMap 으로 <Member, String> 으로 구성
    //


}
