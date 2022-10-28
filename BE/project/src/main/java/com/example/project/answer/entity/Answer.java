package com.example.project.answer.entity;

import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
import com.example.project.question.entity.Question;
import com.example.project.vote.entity.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @Column(name = "ANSWER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(name = "ANSWER_BODY")
    private String body;

    @JsonIgnore           // 무한 참조 순환 방지 annotation
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @JsonIgnore
    @OneToOne(mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "VOTE_ID")
    private Vote vote;

    public void setVote(Vote vote){
        this.vote = vote;
        if (vote.getAnswer()!=this){
            vote.setAnswer(this);
        }
    }
}
