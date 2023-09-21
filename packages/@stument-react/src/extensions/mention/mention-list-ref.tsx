import { Avatar, Box, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconBook2,
  IconBookFilled,
  IconCircleDotFilled,
  IconFileFilled,
  IconHash,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import { forwardRef, useImperativeHandle, useState } from "react";

export type MentionItemTypes =
  | "article"
  | "document"
  | "kcard"
  | "tag"
  | "toturial"
  | "user";

export interface MentionItem {
  code: string;
  category: MentionItemTypes;
  label: string;
  image?: string;
  icon?: string | React.FC;
  description?: string;
}

export interface CategoryMentionItem {
  category: MentionItemTypes;
  items: MentionItem[];
}

export interface MentionListProps {
  categories: CategoryMentionItem[];
  command: (item: MentionItem) => void;
}

const MentionListRef = forwardRef(
  ({ categories, command }: MentionListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [indexItems, setIndexItems] = useState<Map<string, MentionItem>>(
      new Map()
    );
    const [indexes, setIndexes] = useState<string[]>([]);

    const updateMap = (key: string, value: MentionItem) => {
      setIndexItems((map) => new Map(map.set(key, value)));
    };

    const updateIndexes = (value: string) => {
      setIndexes((map) => [value, ...map]);
    };

    const clearMap = () => {
      setIndexItems(new Map());
    };

    useEffect(() => {
      clearMap();
      setIndexes([]);

      categories &&
        categories.forEach((category) => {
          const items = category.items;
          items.forEach((item) => {
            const key = getItemkey(item.category, item.code);
            updateIndexes(key);
            updateMap(key, item);
          });
        });
      setSelectedIndex(0);
    }, [categories]);

    const selectItem = (key: string) => {
      const item = indexItems.get(key);

      if (item) {
        command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + indexes.length - 1) % indexes.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % indexes.length);
    };

    const enterHandler = () => {
      selectItem(indexes[selectedIndex]);
    };

    const getItemkey = (category: MentionItemTypes, code: string | number) => {
      return category + "-" + code.toString();
    };

    const ListRender = ({ category, items }: CategoryMentionItem) => {
      return (
        <Box>
          <Box>{category}</Box>
          <Box>
            {items.length &&
              items.map((item, index) => {
                const key = getItemkey(category, item.code);
                return (
                  <Item
                    item={item}
                    key={index}
                    custonClassName={
                      indexes.indexOf(key) === selectedIndex
                        ? "slash-menu-item slash-menu-item-active"
                        : "slash-menu-item"
                    }
                    onClick={() => selectItem(key)}
                  />
                );
              })}
          </Box>
        </Box>
      );
    };

    const Item = ({
      item,
      custonClassName,
    }: {
      item: MentionItem;
      custonClassName: string;
      onClick: () => void;
    }) => {
      return (
        <UnstyledButton className={custonClassName}>
          <Group gap="xs">
            {item.category === "article" && (
              <ThemeIcon color="slate" variant="light">
                <IconFileFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "document" && (
              <ThemeIcon color="slate" variant="light">
                <IconBookFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "kcard" && (
              <ThemeIcon color="slate" variant="light">
                <IconCircleDotFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "tag" && (
              <ThemeIcon color="slate" variant="light">
                <IconHash size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "toturial" && (
              <ThemeIcon color="slate" variant="light">
                <IconBook2 size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "user" && (
              <Avatar src={item.image}>{item.label}</Avatar>
            )}
            {item.label}
          </Group>
        </UnstyledButton>
      );
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="items">
        {categories?.length ? (
          categories.map((category, index) => {
            return <ListRender {...category} key={index} />;
          })
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    );
  }
);

MentionListRef.displayName = "MentionListRef";

export default MentionListRef;
