package com.example.project.question.entity;

import com.example.project.audit.Auditable;
import com.example.project.tag.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuestionTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionTagId;

    @Column(name = "QUESTION_TAG_NAME")
    private String questionTagName;

    //사용된 태그가 속한 질문
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    //사용된 태그가 속한 태그분류
    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

}
//add 메서드들은 없어서 지웠음. 다대일 이기 때문