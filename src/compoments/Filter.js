import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { datas } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { filteredSalary } from '../stores/salary';


function Filter() {
  const dispatch = useDispatch();
  const { salaries } = useSelector(state => state.salary)
  const { theme } = useSelector(state => state.settings)
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState({});

  const fetchedData = async () => {
    const data = await axios.get('https://raw.githubusercontent.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari/main/2023-yazilim-sektoru-maaslari-oncekiyazilimci.json');
    let turk = data.data.RECORDS;
    data?.data?.RECORDS?.map((objectKey) => {
      turk = turk.filter((data) => data.currency === '₺ - Türk Lirası');
    });
    dispatch(filteredSalary(turk));
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const calculateSalary = (e) => {
    e.preventDefault();
    console.log(dropdownSelectedValue);
    const objectKeys = Object.keys(dropdownSelectedValue);
    let filtered = salaries;

    objectKeys?.map((objectKey) => {
      filtered = filtered.filter((data) => data[objectKey] === dropdownSelectedValue[objectKey]);
    });

    dispatch(filteredSalary(filtered));
  };

  const handleChane = (e) => {
    if (e.target.value && e.target.value !== '') {
      setDropdownSelectedValue({ ...dropdownSelectedValue, [e.target.name]: e.target.value });
    } else {
      delete dropdownSelectedValue[e.target.name];
      setDropdownSelectedValue(dropdownSelectedValue);
    }
  };

  return (
    <div className={theme === "light"? "filter light" : "filter dark"}>
      {datas.map((data) => (<Dropdown key={data.id} name={data.name} handleChane={handleChane} question={data.question} options={data.options} />)) }
      <button className="button" onClick={calculateSalary}> Salary Filter </button>
    </div>
  );
}


export default Filter;
