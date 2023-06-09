import { useSelector } from "react-redux";
import { Text, Paper } from "@mantine/core";

function Avarage({ filteredData }) {
  const { salaries } = useSelector((state) => state.salary);
  const converter = (text) => {
    try {
      return parseInt(text.replace(/\./g, "").replace(/ /g, ""));
    } catch (error) {
      console.log("error");
    }
  };

  const totlaSalary = () => {
    let total = 0;
    let avarageSlitedData = 0;
    const filteredNumber = salaries.length;
    salaries.map((data) => {
      const splitedData = data.salary.split("-");
      if (splitedData.length === 2) {
        avarageSlitedData =
          (converter(splitedData[0]) + converter(splitedData[1])) / 2 + 0.5;
      } else if (splitedData.length === 1) {
        avarageSlitedData = 150000;
      }
      total = total + avarageSlitedData;
    });
    if (filteredNumber) {
      return (
        <div className="Avarage">
          <Paper shadow="xs" p="xl">
            <Text fw={500}> Avarage : </Text>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
            >
              {Math.floor(total / filteredNumber)} TL
            </Text>
          </Paper>
    
        </div>
      );
    }
  };

  return <div>{totlaSalary()}</div>;
}

export default Avarage;
