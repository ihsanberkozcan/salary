import { Input } from "@mantine/core";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Dropdown({ question, name, options, handleChane }) {
  return (
    <div className="dropdown">
      <Input.Wrapper label={question}>
        <Input
          name={name}
          component="select"
          rightSection={<MdOutlineKeyboardArrowDown />}
          onChange={handleChane}
        >
          <option value="">Please choose an option</option>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </Input>
      </Input.Wrapper>
    </div>
  );
}

export default Dropdown;
