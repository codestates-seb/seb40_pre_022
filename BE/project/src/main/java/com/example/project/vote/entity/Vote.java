package com.example.project.vote.entity;

import com.example.project.answer.entity.Answer;
import com.example.project.question.entity.Question;
import lombok.Data;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Data
@Entity
public class Vote {

    @Id
    @Column(name = "VOTE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @OneToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @ElementCollection
    @CollectionTable(name = "MEMBER_VOTE_MAP", joinColumns = @JoinColumn(name="VOTE_ID"))
    @MapKeyColumn(name = "MEMBER_ID")
    @Column(name = "VOTE_RESULT")
    Map<Long, Integer> memberVoteMap = new HashMap<>();

    @Column(name = "VOTE_COUNT")
    private int voteCount;

    @Transient      // entity 등록으로 table에 등록되지 않기 위해 사용 (그냥 vote했는지 여부 주기위함)
    private int voteCheck;

}
