/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import Avarage from './compoments/Avarage';
import ChangeTheme from './compoments/ChangeTheme';
import Filter from './compoments/Filter';
import List from './compoments/List';

function App() {
  const [filteredData, setFilteredData] = useState([]);

  const { theme } = useSelector(state => state.settings)
  return (
    <div className={theme === "light"? "App light" : "App dark"}>
      <h1>Salary Filter 2023</h1>
      <ChangeTheme />
      <Filter setFilteredData={setFilteredData} />
      <Avarage />
      <List />
    </div>
  );
}

export default App;
