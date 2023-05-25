/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
  Header,
  Container,
  Flex,
} from "@mantine/core";

import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import "./App.css";

import Avarage from "./compoments/Avarage";

import Filter from "./compoments/Filter";
import List from "./compoments/List";
import AppHeader from "./compoments/AppHeader";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { theme } = useSelector((state) => state.settings);

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
              <Filter setFilteredData={setFilteredData} />
              <Avarage />
              <List />
            </Flex>
          </Container>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
