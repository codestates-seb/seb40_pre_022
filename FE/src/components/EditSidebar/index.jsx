import React from "react";
import Sidebar from "./style";

export const EditSidebar = () => {
  return (
    <Sidebar>
      <aside>
        <header>How to Edit</header>
        <ul>
          <li>Correct minor typos or mistakes</li>
          <li>Clarify meaning without changing it</li>
          <li>Add related resources or links</li>
          <li>Always respect the author’s intent</li>
          <li>Don’t use edits to reply to the author</li>
        </ul>
      </aside>
    </Sidebar>
  );
};

export default EditSidebar;
