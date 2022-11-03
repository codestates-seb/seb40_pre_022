package com.example.project.question.entity;


import com.example.project.answer.entity.Answer;
import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.project.vote.Vote;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Question extends Auditable implements Comparable<Question>{

    @Id
    @Column(name = "QUESTION_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;  // private, long -> Long : ver 1.1

    @Column(name = "QUESTION_TITLE")
    private String title;

    @Column(name = "QUESTION_BODY")
    private String body;

    @Column(name = "QUESTION_VIEW_COUNT")
    private int viewCount;

    //이 질문의 vote
    @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
    @JoinColumn(name = "VOTE_ID")
    private Vote vote;

    //질문을 작성한 사람
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //질문이 가지고 있는 사용된 태그들
    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();

    //질문에 달린 답변들
    @JsonIgnore
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();


    //question과 vote연결
    public void addVote(Vote vote) {
        this.vote = vote;
    }
    //질문 작성자를 추가하는 메서드
    public void addMember(Member member){
        this.member = member;
    }

    //사용된 태그를 추가하는 메서드
    public void addQuestionTag(QuestionTag questionTag){
        questionTags.add(questionTag);
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
    }

    // sorting 작업을 위한 Comparable 인터페이스 메서드 오버라이드
    @Override
    public int compareTo(Question question) {
        if(question.questionId < questionId){
            return 1;
        } else if(question.questionId > questionId){
            return -1;
        }
        return 0;
    }
}
