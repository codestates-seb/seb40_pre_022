package com.example.project.vote;

import com.example.project.answer.entity.Answer;
import com.example.project.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Vote {

    @Id
    @Column(name = "VOTE_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long voteId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @Column(name = "VOTE_COUNT")
    private int voteCount;

    // 1. Member entity를 그대로 넣기.
    // 2. Long타입의 memberId를 넣기. (2번으로 작성함)

    // CollectionTable의 Attribute는 추후 추가 예정.
    @ElementCollection
    @CollectionTable(
            name = "MEMBER_VOTE_MAP",
            joinColumns = @JoinColumn(name = "VOTE_ID")
    )
    @MapKeyColumn(name = "MEMBER_ID")
    @Column(name = "VOTE_RESULT")
    Map<Long, Long> memberVoteMap = new HashMap<>();

}