import { useState } from "react";
import Tag from "../Tag";
import { HashTagContainer, HashTags } from "./style";

const TagInput = ({
  value,
  tagArr,
  placeholder,
  onChange,
  onKeyUp,
  onClick,
}) => {
  const [isTagsFocus, setIsTagsFocus] = useState(false);
  return (
    <HashTagContainer isFocus={isTagsFocus}>
      <HashTags>
        {tagArr.map((tag) => (
          <Tag key={tag} name={tag} deleteButton onClick={onClick} />
        ))}
      </HashTags>
      <input
        type='text'
        id='tags'
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onKeyUp={(e) => onKeyUp(e)}
        onFocus={() => setIsTagsFocus(true)}
        onBlur={() => setIsTagsFocus(false)}
      />
    </HashTagContainer>
  );
};

export default TagInput;
