import { Avatar, Box, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconBook2,
  IconBookFilled,
  IconCircleDotFilled,
  IconFileFilled,
  IconHash,
} from "@tabler/icons-react";
import React from "react";
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
  onClick?: () => void;
}

export interface CategoryMentionItem {
  category: MentionItemTypes;
  items: MentionItem[];
}

export interface MentionListProps {
  categories: CategoryMentionItem[];
  command: (item: MentionItem) => void;
}

const MentionList = forwardRef(
  ({ categories, command }: MentionListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const indexItems = new Map<string, MentionItem>();
    const indexes: string[] = [];

    // useEffect(() => {
    //   categories.forEach((category) => {
    //     const items = category.items;
    //     items.forEach((item) => {
    //       const key = getItemkey(item.category, item.code);
    //       indexes.push(key);
    //       indexItems.set(key, item);
    //     });
    //   });

    //   setSelectedIndex(0);

    //   return () => {
    //     indexItems = new Map<string, MentionItem>();
    //     indexes = [];
    //   };
    // }, [categories]);

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
          <Box tt="uppercase">{category}</Box>
          <Box>
            {items.length &&
              items.map((item, index) => {
                const key = getItemkey(category, item.code);
                return (
                  <Item {...item} key={index} onClick={() => selectItem(key)} />
                );
              })}
          </Box>
        </Box>
      );
    };

    const Item = (item: MentionItem) => {
      return (
        <UnstyledButton>
          <Group>
            {item.category === "article" && (
              <ThemeIcon>
                <IconFileFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "document" && (
              <ThemeIcon>
                <IconBookFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "kcard" && (
              <ThemeIcon>
                <IconCircleDotFilled size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "tag" && (
              <ThemeIcon>
                <IconHash size="1rem" />
              </ThemeIcon>
            )}
            {item.category === "toturial" && (
              <ThemeIcon>
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
        {categories.length ? (
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

MentionList.displayName = "MentionList";

export default MentionList;
