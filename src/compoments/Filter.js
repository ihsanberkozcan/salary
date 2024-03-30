import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import { datas } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { filteredSalary2023, filteredSalary2024 } from "../stores/salary";
import { Button, Space, Box } from "@mantine/core";
import { setLoading } from "../stores/loading";

function Filter() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.settings);
  const { loading } = useSelector((state) => state.loading);
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState({});
  const [data2023, setData2023] = useState([]);
  const [data2024, setData2024] = useState([]);
  const fetchedData = async () => {
    const salary2023 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari/main/2023-yazilim-sektoru-maaslari-oncekiyazilimci.json"
    );
    const salary2024 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari/main/2024-yazilim-sektoru-maaslari-onceki-yazilimci.json"
    );
    let turkLirasi2023 = salary2023.data.RECORDS;
    salary2023?.data?.RECORDS?.map((objectKey) => {
      turkLirasi2023 = turkLirasi2023.filter((data) => data.currency === "₺ - Türk Lirası");
    });

    let turkLirasi2024 = salary2024.data.RECORDS;
    salary2024?.data?.RECORDS?.map((objectKey) => {
      turkLirasi2024 = turkLirasi2024.filter((data) => data.currency === "₺ - Türk Lirası");
    });
    setData2023(turkLirasi2023);
    setData2024(turkLirasi2024);
    dispatch(filteredSalary2023(turkLirasi2023));
    dispatch(filteredSalary2024(turkLirasi2024));
    dispatch(setLoading(false))
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const calculateSalary = (e) => {
    e.preventDefault();
    const objectKeys = Object.keys(dropdownSelectedValue);
    console.log(objectKeys)
    let filtered2023 = data2023;
    let filtered2024 = data2024;

    objectKeys?.map((objectKey) => {
      console.log(objectKey)
      filtered2023 = filtered2023.filter(
        (data) => data[objectKey] === dropdownSelectedValue[objectKey]
      );

    });
    objectKeys?.map((objectKey) => {

      filtered2024 = filtered2024.filter(
        (data) => data[objectKey] === dropdownSelectedValue[objectKey]
      );


    });

    dispatch(filteredSalary2023(filtered2023));
    dispatch(filteredSalary2024(filtered2024));
  };

  const handleChane = (e, name) => {
    console.log(e.target.value)
    console.log(name)
    if (e.target.value && e.target.value !== "" && e.target.value !== "All") {
      setDropdownSelectedValue({
        ...dropdownSelectedValue,
        [name]: e.target.value,
      });
    } else {
      delete dropdownSelectedValue[name];
      setDropdownSelectedValue(dropdownSelectedValue);
    }
  };

  return (
    <div>

      {!loading ? (<Box w={300}>
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
      </Box>) : <div className="full"><span class="loader"></span></div>}

    </div>
  );
}

export default Filter;
