import { useDispatch, useSelector } from "react-redux";
import { Text, Paper, Card } from "@mantine/core";
import { setAverage2023 } from "../stores/salary";
import { useState } from "react";

function Average({ salaries, year }) {
  let IncreaseDecrease = 0;
  const dispatch = useDispatch();
  const { average2023 } = useSelector((state) => state.salary);
  const converter = (text) => {
    try {
      return parseInt(text.replace(/\./g, "").replace(/ /g, ""));
    } catch (error) {
      console.log("error");
    }
  };

  const totalSalary = () => {
    let total = 0;
    let averageSlitedData = 0;
    const filteredNumber = salaries.length;
    salaries.map((data) => {
      const splitedData = data.salary.split("-");
      if (splitedData.length === 2) {
        averageSlitedData =
          (converter(splitedData[0]) + converter(splitedData[1])) / 2 + 0.5;
      } else if (splitedData.length === 1) {
        averageSlitedData = 150000;
      }
      total = total + averageSlitedData;
       IncreaseDecrease = Math.floor((((Math.floor(total / filteredNumber)) - average2023) / average2023) * 100)
    });

    if (year == 2023 && filteredNumber) {
      dispatch(setAverage2023(Math.floor(total / filteredNumber)))
    }
    if (filteredNumber) {
      return (
        <div className="Average">
          <Card withBorder radius="md" padding="xl">
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {year} Average
            </Text>
            <div className="averageMoney">
              <Text fw={700} fz="xl">
                {Math.floor(total / filteredNumber)} TL
              </Text>
              <div className="increase-decrease">
              <Text fz="xs" fw={700} style={{ color: IncreaseDecrease > 0 ? "#12b886" : "#fa5252" }}>
                  {year == 2024 ? <>{IncreaseDecrease}%</> : <>&#8203;</>} 
                </Text>
              </div>
            </div>
            <Text fz="xs" fw={700} c="dimmed">
              (Average salary of {filteredNumber} users)
            </Text>

          </Card>
        </div>
      );
    }
  };

  return <div>{totalSalary()}</div>;
}

export default Average;
