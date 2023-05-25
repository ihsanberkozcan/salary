import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import { datas } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { filteredSalary } from "../stores/salary";
import { Button, Space, Box } from "@mantine/core";

function Filter() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState({});
  const [data, setData] = useState();
  const fetchedData = async () => {
    const data = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari/main/2023-yazilim-sektoru-maaslari-oncekiyazilimci.json"
    );
    let turk = data.data.RECORDS;
    data?.data?.RECORDS?.map((objectKey) => {
      turk = turk.filter((data) => data.currency === "₺ - Türk Lirası");
    });
    setData(turk);
    dispatch(filteredSalary(turk));
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const calculateSalary = (e) => {
    e.preventDefault();
    const objectKeys = Object.keys(dropdownSelectedValue);
    let filtered = data;

    objectKeys?.map((objectKey) => {
      filtered = filtered.filter(
        (data) => data[objectKey] === dropdownSelectedValue[objectKey]
      );
    });

    dispatch(filteredSalary(filtered));
  };

  const handleChane = (e) => {
    if (e.target.value && e.target.value !== "") {
      setDropdownSelectedValue({
        ...dropdownSelectedValue,
        [e.target.name]: e.target.value,
      });
    } else {
      delete dropdownSelectedValue[e.target.name];
      setDropdownSelectedValue(dropdownSelectedValue);
    }
  };

  return (
    <div>
      <Box w={300}>
        {datas.map((data) => (
          <>
            <Dropdown
              key={data.id}
              name={data.name}
              handleChane={handleChane}
              question={data.question}
              options={data.options}
            />
            <Space h="xs" />
          </>
        ))}
        <Space h="sm" />
        <Button color="violet" fullWidth size="md" onClick={calculateSalary}>
          Salary Filter
        </Button>
        <Space h="md" />
      </Box>
    </div>
  );
}

export default Filter;
