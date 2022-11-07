import { useCallback } from "react";
import Tag from "../Tag";
import { useRecoilState } from "recoil";
import { HashTagContainer, HashTags } from "./style";
import { QuestionTags } from "../../store/QuestionPost";

const TagInput = () => {
  const [tags, setTags] = useRecoilState(QuestionTags);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      const value = e.target.value;
      if (!value.trim()) return;
      setTags([...tags, value]);
      e.target.value = "";
    },
    [tags]
  );

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <HashTagContainer>
      <HashTags>
        {tags.map((tag, index) => (
          <div key={index}>
            <Tag
              key={tag}
              name={tag}
              deleteButton
              onClick={() => removeTag(index)}
            />
          </div>
        ))}
      </HashTags>
      <input
        type="text"
        value={tags.value}
        placeholder=""
        onKeyDown={handleKeyDown}
      />
    </HashTagContainer>
  );
};

export default TagInput;
