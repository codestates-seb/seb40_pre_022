import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { ENG_REGEX } from "../../constants/regex";

import Tag from "../Tag";
import { HashTagContainer, HashTags } from "./style";

const TagInput = () => {
  const [isTagsFocus, setIsTagsFocus] = useState(false);
  const [tags, setTags] = useState([]);

  console.log(
    "tags",
    tags.map((tag) => {
      return {
        questionTagName: tag,
      };
    }),
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      const value = e.target.value;
      if (!value.trim()) return;
      setTags([...tags, value]);
      e.target.value = "";
    },
    [tags],
  );

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <HashTagContainer isFocus={isTagsFocus}>
      <HashTags>
        {tags.map((tag, index) => (
          <div key={index}>
            <Tag key={tag} name={tag} />
            <div onClick={() => removeTag(index)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        ))}
      </HashTags>
      <input
        type='text'
        value={tags.value}
        placeholder=''
        onKeyDown={handleKeyDown}
      />
    </HashTagContainer>
  );
};

export default TagInput;

//"questionTags":[{"questionTagName": "javascript"}, {"questionTagName": "python"}
