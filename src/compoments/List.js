import { useSelector } from "react-redux";

function List() {
  const { salaries } = useSelector((state) => state.salary);
  const { theme } = useSelector((state) => state.settings);
  return (
    <div className={theme === "light" ? "table light" : "table dark"}>
      {salaries.length !== 0 ? (
        <div>
          <div className="Length">
            <span>{salaries.length}</span>
          </div>
          <table>
            <tr>
              <th>Level</th>
              <th>Position</th>
              <th>Tech Stack</th>
              <th>Experience</th>
              <th>Company size</th>
              <th>Work Type</th>
              <th>City</th>
              <th>Salary</th>
            </tr>
            {salaries.map((data) => (
              <tr>
                <td>{data.level}</td>
                <td>{data.position}</td>
                <td>{data.tech_stack}</td>
                <td>{data.experience}</td>
                <td>{data.company_size}</td>
                <td>{data.work_type}</td>
                <td>{data.city}</td>
                <td>
                  {data.salary} {" TL"}
                </td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default List;
