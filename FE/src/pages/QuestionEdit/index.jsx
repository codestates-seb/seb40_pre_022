import { React, useState, useCallback } from "react";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import ContentEditor from "../../components/ContentEditor";
import EditSidebar from "../../components/EditSidebar";
import TagInput from "../../components/TagInput";
import { ENG_REGEX } from "../../constants/regex";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { questionsData } from "../../api/questions";

import {
  EditBox,
  EditContainer,
  EditTitleText,
  EditInput,
  TagsContainer,
  BtnBox,
  TagTitle,
} from "./style";

const QuestionEdit = () => {
  const [tagInput, setTagInput] = useState("");
  const [tagArr, setTagArr] = useState(["react"]);

  const params = Number(useParams().id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["detailQ"], () => {
    return questionsData(params);
  });
  if (isLoading) return <div>now loading..</div>;
  console.log(data);

  const { mutate, data1 } = useMutation(questionsPost, {
    retry: 0,
    onSuccess: (data1) => {
      const postid = data.data.data.questionId;
      navigate(`/questions/${postid}`);
    },
  });

  // const handleTagInputOnKeyUp = useCallback(
  //   (e) => {
  //     const target = e.target;
  //     if (
  //       e.key === "Enter" &&
  //       target.value.trim() !== "" &&
  //       !tagArr.includes(target.value)
  //     ) {
  //       setTagArr((prev) => [...prev, target.value]);
  //       setTagInput("");
  //     }
  //   },
  //   [tagArr]
  // );

  // const handleTagInputChange = (e) => {
  //   const { value } = e.target;
  //   if (ENG_REGEX.test(value)) {
  //     setTagInput(value);
  //   }
  // };

  // const handleTagDelete = (name) => {
  //   const deletedTags = tagArr.filter((tag) => tag !== name);
  //   setTagArr(deletedTags);
  // };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    mutate({
      title: titleText,
      body: bodyText,
      questionTags: tagArr,
    });
  };

  return (
    <Layout>
      <EditContainer>
        <EditBox>
          <EditTitleText>Title</EditTitleText>
          <EditInput
            question={data}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          ></EditInput>
          <EditTitleText>Body</EditTitleText>
          <ContentEditor question={data} />
          <TagsContainer>
            <TagTitle>Tags</TagTitle>
            <TagInput
              question={data}
              value={tagInput}
              tagArr={tagArr}
              placeholder="e.g. (angular sql-server string)"
              onChange={handleTagInputChange}
              onKeyUp={handleTagInputOnKeyUp}
              onClick={handleTagDelete}
            />
          </TagsContainer>
          <EditTitleText>Edit Summary</EditTitleText>
          <EditInput placeholder="briefly explain your changes (corrected spelling, fixed grammar, improved formatting)"></EditInput>
          <BtnBox>
            <Link to="/question/edit">
              <Button label="Save edits" onClick={handleEditSubmit}></Button>
              <Button primary="Linkbutton" label="Cancel"></Button>
            </Link>
          </BtnBox>
        </EditBox>
        <EditSidebar></EditSidebar>
      </EditContainer>
    </Layout>
  );
};

export default QuestionEdit;
