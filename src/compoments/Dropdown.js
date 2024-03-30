import { Input, NativeSelect } from "@mantine/core";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Dropdown({ question, name, options, handleChane }) {
  
  return (
    <div className="dropdown">
      <NativeSelect
        data={options}
        label={question}
        onChange={(event) => handleChane(event,name)}
      />
    </div>
  );
}

export default Dropdown;
