package com.example.project.tag;

import com.example.project.audit.Auditable;
import com.example.project.question.entity.QuestionTag;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Tag extends Auditable {

    @Id
    @Column(name = "TAG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @Column(name = "TAG_NAME")
    private String tagName;

    @Column(name = "TAG_COUNT")
    private int usageCount;

    //태그 분류별로 사용된 태그의 리스트를 저장한다.
    @JsonIgnore
    @OneToMany(mappedBy = "tag")
    private List<QuestionTag> questionTags = new ArrayList<>();

    //사용된 태그를 리스트에 넣기 위한 메서드
    public void addQuestionTag(QuestionTag questionTag){
        questionTags.add(questionTag);
    }
}
