import { Text, Card } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSalaryStore } from "../stores";

function Average({ salaries = [], year, lastYearAvarage }) {
  const [stats, setStats] = useState({ mean: 0, median: 0, mode: 0, count: 0 });
  const { setAverage2023, setAverage2024, setAverage2025 } = useSalaryStore();

  const converter = (text) => {
    if (!text) return 0;
    try {
      return parseInt(text.replace(/\./g, "").replace(/ /g, "")) || 0;
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    if (!Array.isArray(salaries) || salaries.length === 0) {
      setStats({ mean: 0, median: 0, mode: 0, count: 0 });
      return;
    }

    const all = salaries
      .map((data) => {
        if (!data || !data.salary) return null;
        const splitedData = data.salary.split("-");
        if (splitedData.length === 2) {
          return (converter(splitedData[0]) + converter(splitedData[1])) / 2 + 0.5;
        } else if (splitedData.length === 1) {
          return converter(splitedData[0]);
        }
        return null;
      })
      .filter((n) => typeof n === "number" && !Number.isNaN(n));

    const count = all.length;
    const total = all.reduce((acc, v) => acc + v, 0);

    const findMedian = (arr) => {
      if (!arr.length) return 0;
      const nums = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(nums.length / 2);
      return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const findMode = (arr) => {
      if (!arr.length) return 0;
      const frequency = {};
      let maxFreq = 0;
      let mode = 0;
      for (const num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
          maxFreq = frequency[num];
          mode = num;
        }
      }
      return mode;
    };

    const mean = count ? Math.floor(total / count) : 0;
    const median = Math.floor(findMedian(all));
    const mode = Math.floor(findMode(all));

    setStats({ mean, median, mode, count });

    if (count) {
      if (year === 2023) setAverage2023(mean);
      if (year === 2024) setAverage2024(mean);
      if (year === 2025) setAverage2025(mean);
    }
  }, [salaries, year]);

  if (!stats.count) return null;

  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      sx={(theme) => ({
        flex: "1 1 100%", 
        maxWidth: "100%",
        boxSizing: "border-box",
  
      })}
    >
      <Text fz="md" tt="uppercase" fw={700} c="dimmed">
        {year} Average
      </Text>

      <div className="averageMoney" style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
        <div className="salary" style={{ flex: "1 1 100%" }}>
          <Text fw={400} fz="md">
            Mean:
          </Text>
          <Text fw={700} fz="md">
            {stats.mean.toLocaleString("tr-TR")} TL
          </Text>
        </div>
        <div className="salary" style={{ flex: "1 1 100%" }}>
          <Text fw={400} fz="md">
            Median:
          </Text>
          <Text fw={700} fz="md">
            {stats.median.toLocaleString("tr-TR")} TL
          </Text>
        </div>
        <div className="salary" style={{ flex: "1 1 100%" }}>
          <Text fw={400} fz="md">
            Mode:
          </Text>
          <Text fw={700} fz="md">
            {stats.mode.toLocaleString("tr-TR")} TL
          </Text>
        </div>
      </div>

      <Text fz="xs" fw={700} c="dimmed" mt="5px">
        (Average salary of {stats.count} users)
      </Text>
    </Card>
  );
}

export default Average;