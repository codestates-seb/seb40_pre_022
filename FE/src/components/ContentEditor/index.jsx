import { React, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRecoilState } from "recoil";
import AnswerEditData from "../../store/AnswerEditData";

const ContentEditor = () => {
  const [answerData, setAnswerData] = useRecoilState(AnswerEditData);
  const editorRef = useRef();

  const onChangeHandle = () => {
    let data = editorRef.current.getInstance().getMarkdown();
    setAnswerData(data);
  };
  return (
    <Editor
      placeholder='내용을 입력해주세요.'
      previewStyle='tab'
      height='300px'
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "image", "link"],
        ["code", "codeblock"],
      ]}
      useCommandShortcut={true}
      hideModeSwitch={true}
      ref={editorRef}
      onChange={onChangeHandle}></Editor>
  );
};

export default ContentEditor;
