import React, { useState } from "react";
import { AskRight, RoleContainer, Title, Content, Ol, Ul } from "./style";

const step1_1 = [
  {
    title: "1. Summarize the problem",
    content: [
      "Include details about your goal",
      "Describe expected and actual results",
      "Include any error messages",
    ],
  },
  {
    title: "2. Describe what you've tried",
    content: [
      "IShow what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.",
    ],
  },
  {
    title: "3. show some code",
    content: [
      "When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)",
    ],
  },
];

const QuestionAskRight = () => {
  const [select, setSelect] = useState(false);

  const clicked = (idx) => {
    if (idx === select) {
      setSelect(false);
    } else {
      setSelect(idx);
    }
  };

  return (
    <>
      <AskRight>
        <RoleContainer>
          <Title>Step 1: Draft your question</Title>
          <Content>
            The community is here to help you with specific coding, algorithm,
            or language problems. <br />
            <br />
            Avoid asking opinion-based questions. <br />
            <br />
            {step1_1.map((el, idx) => {
              return (
                <Ol key={idx} onClick={(e) => clicked(idx)}>
                  <li className='li-content'>
                    <div className='li-title-logo'>{el.title}</div>
                    <div>
                      {el.content.map((el, idx2) => {
                        return (
                          <Ul
                            key={idx2}
                            display={select === idx ? "block" : "none"}>
                            <li>{el}</li>
                          </Ul>
                        );
                      })}
                    </div>
                  </li>
                </Ol>
              );
            })}
          </Content>
        </RoleContainer>
      </AskRight>
    </>
  );
};

export default QuestionAskRight;
