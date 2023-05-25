import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

function ChangeTheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <BsSun size="1.1rem" /> : <BsMoonStars size="1.1rem" />}
    </ActionIcon>
  );
}

export default ChangeTheme;
