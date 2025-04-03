import { useDispatch, useSelector } from "react-redux";
import { Text, Paper, Card } from "@mantine/core";
import { setAverage2023, setAverage2024 } from "../stores/salary";
import { useEffect, useState } from "react";

function Average({ salaries, year, lastYearAvarage }) {
  let IncreaseDecrease = 0;
  console.log("salaries "+year, salaries);
  const [sallariesArray, setSallariesArray] = useState([]);
  const dispatch = useDispatch();

  const converter = (text) => {
    try {
      return parseInt(text.replace(/\./g, "").replace(/ /g, ""));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    const allSalary = salaries.map((data) => {
      const splitedData = data.salary.split("-");
      if (splitedData.length === 2) {
        return (
          (converter(splitedData[0]) + converter(splitedData[1])) / 2 + 0.5
        );
      } else if (splitedData.length === 1) {
        return 150000;
      }
    });
    setSallariesArray(allSalary);
}, [salaries]);

  const totalSalary = () => {
    let total = 0;
    let averageSlitedData = 0;
    const filteredNumber = salaries?.length;
    salaries?.map((data) => {
      const splitedData = data.salary.split("-");
      if (splitedData.length === 2) {
        averageSlitedData =
          (converter(splitedData[0]) + converter(splitedData[1])) / 2 + 0.5;
      } else if (splitedData.length === 1) {
        averageSlitedData = 150000;
      }
      total = total + averageSlitedData;
      IncreaseDecrease = Math.floor(
        ((Math.floor(total / filteredNumber) - lastYearAvarage) /
          lastYearAvarage) *
          100
      );
    });

    const findMedian = (sallariesArray) => {


      const nums = [...sallariesArray].sort((a, b) => a - b);
      const mid = Math.floor(nums.length / 2);

      return nums.length % 2 !== 0
        ? nums[mid]
        : (nums[mid - 1] + nums[mid]) / 2;
    };

    const findMode = (sallariesArray) => {

      const frequency = {};
      let maxFreq = 0;
      let mode = null;
      for (const num of sallariesArray) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
          maxFreq = frequency[num];
          mode = num;
        }
      }
      return mode;
    };

    if (year == 2023 && filteredNumber) {
      dispatch(setAverage2023(Math.floor(total / filteredNumber)));
    }
    if (year == 2024 && filteredNumber) {
      dispatch(setAverage2024(Math.floor(total / filteredNumber)));
    }
    if (filteredNumber) {
      return (
        <div className="Average">
          <Card withBorder radius="md" padding="xl">
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {year} Average
            </Text>
            <div className="averageMoney">
              <div className="salary">
                <Text fw={400} fz="lg">
                  Mean:
                </Text>
                <Text fw={700} fz="xl">
                  {Math.floor(total / filteredNumber).toLocaleString("tr-TR")}{" "}
                  TL
                </Text>
              </div>
              <div className="salary">
                <Text fw={400} fz="lg">
                  Median:
                </Text>

                <Text fw={700} fz="xl">
                  {Math.floor(findMedian(sallariesArray)).toLocaleString("tr-TR")} TL
                </Text>
              </div>
              <div className="salary">
                <Text fw={400} fz="lg">
                  Mode:
                </Text>
                <Text fw={700} fz="xl">
                  {Math.floor(findMode(sallariesArray)).toLocaleString("tr-TR")} TL
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
