import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";

import { ISlashMenuItem } from "./menu";

export interface ISlashMenuRefProps {
  items: ISlashMenuItem[];
  command: (item: ISlashMenuItem) => void;
}

export const SlashMenuRef = forwardRef((props: ISlashMenuRefProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex(
          (selectedIndex + props.items.length - 1) % props.items.length
        );
        return true;
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }

      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  useEffect(() => setSelectedIndex(0), [props.items]);

  return (
    <Box className="slash-menu-box">
      <div>
        {props.items.length ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props.items.map((item: any, index: number) => (
            <UnstyledButton
              key={index}
              onClick={() => selectItem(index)}
              className={
                selectedIndex === index
                  ? "slash-menu-item slash-menu-item-active"
                  : "slash-menu-item"
              }
            >
              <Group gap="xs">
                <ThemeIcon color="slate" variant="light">
                  {React.createElement(item.icon)}
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {item.title}
                  </Text>
                  <Text size="xs" className="font-mini-slate">
                    {item.description}
                  </Text>
                </Stack>
              </Group>
            </UnstyledButton>
          ))
        ) : (
          <Button className="item">No result</Button>
        )}
      </div>
    </Box>
  );
});
