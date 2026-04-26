import { useState } from "react";

import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Header,
  Container,
  Flex,
  Alert,
  Grid,
} from "@mantine/core";

import { Text } from "@mantine/core";

import "./App.css";

import Average from "./compoments/Average";
import Filter from "./compoments/Filter";
import AppHeader from "./compoments/AppHeader";

import { useSalaryStore } from "./stores";

function App() {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const {
    salaries2023,
    salaries2024,
    salaries2025,
    salaries2026,
    average2023,
    average2024,
    average2025,
  } = useSalaryStore();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
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

             <Alert title="Source of the data" color="violet" mt="lg">
                The data here is taken from a survey conducted by{" "}
                <a href="https://twitter.com/oncekiyazilimci">
                  <Text span c="violet" inherit fw={500}>
                    Önceki Yazılımcı
                  </Text>
                </a>
                . You can also read the{" "}
                <a href="https://oncekiyazilimci.medium.com/">
                  <Text span c="violet" inherit fw={500}>
                    articles
                  </Text>
                </a>{" "}
                he wrote on the Medium for more detailed information,
              </Alert>

            <Grid mt="sm">

              <Grid.Col
                xs={12}
                sm={12}
                md={4}
                lg={3}
              >
                <Filter />
              </Grid.Col>

  
              <Grid.Col
                xs={12}
                sm={12}
                md={8}
                lg={9}
              >
                <Flex
                  gap="sm"
                  wrap="wrap"
                  justify="flex-start"
                >
                  <Average
                    year="2026"
                    salaries={salaries2026}
                    lastYearAvarage={average2025}
                  />
                  <Average
                    year="2025"
                    salaries={salaries2025}
                    lastYearAvarage={average2024}
                  />
                  <Average
                    year="2024"
                    salaries={salaries2024}
                    lastYearAvarage={average2023}
                  />

                  <Average year="2023" salaries={salaries2023} />
                </Flex>
              </Grid.Col>

            </Grid>

          </Container>

          <a href="https://github.com/ihsanberkozcan">
            <Text c="violet" ta="center" mt={10} inherit fw={500}>
              @ihsanberkozcan
            </Text>
          </a>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;