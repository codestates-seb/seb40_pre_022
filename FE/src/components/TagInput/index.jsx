import { useState } from "react";
import Tag from "../Tag";
import { Container, HashTagContainer, HashTags, SLabel } from "./style";

const TagInput = ({
  value,
  tagArr,
  placeholder,
  marginBottom = "30px",
  onChange,
  onKeyUp,
  onClick,
}) => {
  const [isTagsFocus, setIsTagsFocus] = useState(false);
  return (
    <Container>
      <SLabel htmlFor='tags'>Tags</SLabel>
      <HashTagContainer isFocus={isTagsFocus} marginBottom={marginBottom}>
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
    </Container>
  );
};

export default TagInput;
