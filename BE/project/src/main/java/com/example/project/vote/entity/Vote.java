package com.example.project.vote.entity;

import com.example.project.answer.entity.Answer;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Objects;

@Entity
public class Vote {

    @Id
    @Column(name = "vote_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    // Membervote의 리스트는 vote에서 참조할 경우가 있다면 추가할 예정.


    // todo 고려할 내용
    // 1. Member entity를 그대로 넣기.
    // 2. Long타입의 memberId를 넣기. (2번으로 작성함)
    @ElementCollection
    @CollectionTable
    HashMap<Long, String> memberVoteMap = new HashMap<>();
    // voteCount = memberVoteMap의 value값 up 갯수 - down 갯수
    // map.values();

//    int upCount = (int) memberVoteMap.values().stream()
//            .filter(a -> a.equals("like"))
//            .count();
//
//    int downCount = (int) memberVoteMap.values().stream()
//            .filter(a -> a.equals("hate"))
//            .count();

    // Vote 가 사용되는 곳
    // 1. Answer Vote-up, vote-down을 눌렀을 때, answerId를 통해 Vote를 가져와서, 처리함.
    // 2. Question Vote-up, down 을 눌렀을 때, QuestionId를 통해 Vote를 가져와서 처리함.


    private int voteCount;


    // Todo
    // 1. HashMap 으로 <Member, String> 으로 구성
    //


}
