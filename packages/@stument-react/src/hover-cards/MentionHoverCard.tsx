import { ActionIcon, Badge, HoverCard } from "@mantine/core";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  IconUser,
  IconBook2,
  IconBook,
  IconHash,
  IconPointFilled,
  IconCircleDotFilled,
} from "@tabler/icons-react";
import React from "react";

export const HoverCardBadge = ({ node }: NodeViewProps) => {
  const CategoryIcon = () => {
    const category = node.attrs.category;
    switch (category) {
      case "user":
        return <IconUser size="0.9rem" />;
      case "document":
        return <IconBook2 size="0.9rem" />;
      case "toturial":
        return <IconBook size="0.9rem" />;
      case "topic":
        return <IconHash size="0.9rem" />;
      case "kcard":
        return <IconCircleDotFilled size="0.9rem" />;
      default:
        return <IconPointFilled size="0.9rem" />;
    }
  };

  // const CategoryColor = (): string => {
  //   const category = node.attrs.category;
  //   switch (category) {
  //     case "user":
  //       return "blue";
  //     case "document":
  //       return "green";
  //     case "toturial":
  //       return "cyan";
  //     case "topic":
  //       return "dark";
  //     default:
  //       return "dark";
  //   }
  // };

  return (
    <NodeViewWrapper
      as="span"
      style={{
        verticalAlign: "text-top",
      }}
    >
      <HoverCard withArrow shadow="lg" withinPortal>
        <HoverCard.Target>
          <Badge
            tt="revert"
            component="span"
            pl={0}
            size="xs"
            my={0}
            variant="default"
            className="hover-card-badge"
            leftSection={
              <ActionIcon
                color="slate"
                variant="filled"
                size="xs"
                style={{ border: 0 }}
              >
                <CategoryIcon />
              </ActionIcon>
            }
          >
            {node.attrs.label}
          </Badge>
        </HoverCard.Target>
        <HoverCard.Dropdown>aaaa</HoverCard.Dropdown>
      </HoverCard>
    </NodeViewWrapper>
  );
};
