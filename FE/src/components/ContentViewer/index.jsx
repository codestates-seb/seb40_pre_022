import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

import React from "react";

const ContentViewer = ({ markdown }) => {
  return <Viewer initialValue={markdown} />;
};

export default ContentViewer;
