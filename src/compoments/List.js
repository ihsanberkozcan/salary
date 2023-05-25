import { useSelector } from "react-redux";
import { Space, Table, Text } from "@mantine/core";
function List() {
  const { salaries } = useSelector((state) => state.salary);
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      {salaries.length !== 0 ? (
        <div>
          <div className="Length">
            <Text fz="xs">{salaries.length}</Text>
          </div>
          <Space h="sm" />
          <Table striped>
            <thead>
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
            </thead>
            <tbody>
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
            </tbody>
          </Table>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default List;
