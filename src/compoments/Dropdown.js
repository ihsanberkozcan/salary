function Dropdown({ question, name, options, handleChane }) {
  return (
    <div className="dropdown">
      <label htmlFor="option">{question}</label>
      <select className="option" name={name} id="option" onChange={handleChane}>
        <option value="">Please choose an option</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
