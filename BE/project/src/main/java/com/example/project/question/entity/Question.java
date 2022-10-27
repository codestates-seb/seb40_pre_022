package com.example.project.question.entity;


import com.example.project.answer.entity.Answer;
import com.example.project.audit.Auditable;
import com.example.project.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;  // private, long -> Long : ver 1.1

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private Integer viewCount;

    //질문을 작성한 사람
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //질문이 가지고 있는 사용된 태그들
    @OneToMany(mappedBy = "question")
    private List<QuestionTag> questionTags = new ArrayList<>();

    //질문에 달린 답변들
    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

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
    //Vote vote;

}
