import {
  Avatar,
  Box,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
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
  items: CategoryMentionItem[];
  command: (item: MentionItem) => void;
}

const MentionListRef = forwardRef(
  ({ items, command }: MentionListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [indexItems, setIndexItems] = useState<Map<string, MentionItem>>(
      new Map()
    );
    const [indexes, setIndexes] = useState<string[]>([]);

    const updateMap = (key: string, value: MentionItem) => {
      setIndexItems((map) => new Map(map.set(key, value)));
    };

    const updateIndexes = (value: string) => {
      setIndexes((map) => [...map, value]);
    };

    const clearMap = () => {
      setIndexItems(new Map());
    };

    useEffect(() => {
      clearMap();
      setIndexes([]);

      items &&
        items.forEach((category) => {
          const category_items = category.items;
          category_items.forEach((item) => {
            const key = getItemkey(item.category, item.code);
            updateIndexes(key);
            updateMap(key, item);
          });
        });
      setSelectedIndex(0);
    }, [items]);

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
        <Box className="mention-group">
          <Box className="mention-label">{category}</Box>
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
                        ? "mention-item mention-item-active"
                        : "mention-item"
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
      onClick,
    }: {
      item: MentionItem;
      custonClassName: string;
      onClick: () => void;
    }) => {
      return (
        <UnstyledButton className={custonClassName} onClick={onClick}>
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
              <Avatar src={item.image} size="xs">
                {item.label}
              </Avatar>
            )}
            <Text size="sm">{item.label}</Text>
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
      <div className="mention-box">
        {items?.length ? (
          items.map((item, index) => {
            return <ListRender {...item} key={index} />;
          })
        ) : (
          <div className="mention-item">No result</div>
        )}
      </div>
    );
  }
);

MentionListRef.displayName = "MentionListRef";

export default MentionListRef;
