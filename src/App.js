/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Header,
  Container,
  Flex,
  Alert,
} from "@mantine/core";

import { Text, Title } from '@mantine/core';


import "./App.css";

import Average from "./compoments/Average";

import Filter from "./compoments/Filter";

import AppHeader from "./compoments/AppHeader";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { salaries2023 } = useSelector((state) => state.salary);
  const { salaries2024 } = useSelector((state) => state.salary);
  const { salaries2025 } = useSelector((state) => state.salary);
  const { theme } = useSelector((state) => state.settings);

  const { average2023,average2024 } = useSelector((state) => state.salary);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs">
              <AppHeader />
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Container size="xl">
            <Flex align="center" direction="column">
              <Alert title="Source of the data" color="violet" mt="lg">
                The data here is taken from a survey conducted by <a href="https://twitter.com/oncekiyazilimci"><Text span c="violet" inherit fw={500}>Önceki Yazılımcı</Text></a>. You can also read the <a href="https://oncekiyazilimci.medium.com/"><Text span c="violet" inherit fw={500}>articles</Text></a> he wrote on the Medium for more detailed information,
              </Alert>
              <Filter setFilteredData={setFilteredData} />
              <div className="salaries">
                <Average year="2023" salaries={salaries2023} />
                <Average year="2024" salaries={salaries2024} lastYearAvarage={average2023}/>
                <Average year="2025" salaries={salaries2025} lastYearAvarage={average2024}/>
              </div>
            </Flex>


          </Container>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
