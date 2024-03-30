import ChangeTheme from "./ChangeTheme";
import { Title } from "@mantine/core";
import { Flex } from "@mantine/core";

function AppHeader() {
  return (
    <Flex align="center" justify="space-between">
      <Title order={1} size="h3">Salary Filter</Title>
      <ChangeTheme />
    </Flex>
  );
}
export default AppHeader;
