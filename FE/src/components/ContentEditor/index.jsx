import { React, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ContentEditor = () => {
  const [answerData, setAnswerData] = useState("");
  const editorRef = useRef();

  const onChangeHandle = () => {
    let data = editorRef.current.getInstance().getMarkdown();
    setAnswerData(data);
  };
  return (
    <Editor
      placeholder='내용을 입력해주세요.'
      previewStyle='tab' // 미리보기 스타일 지정
      height='300px' // 에디터 창 높이
      toolbarItems={[
        // 툴바 옵션 설정
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
