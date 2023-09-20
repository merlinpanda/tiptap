import { ActionIcon, Badge, HoverCard } from '@mantine/core';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { IconUser, IconBook2, IconBook, IconHash, IconPointFilled } from '@tabler/icons-react';
export const HoverCardBadge = ({ node }: NodeViewProps) => {
  const CategoryIcon = () => {
    const category = node.attrs.category;
    switch(category) {
      case "user":
        return <IconUser size="1rem" />
      case "document":
        return <IconBook2 size="1rem" />
      case "toturial":
        return <IconBook size="1rem" />
      case "topic":
        return <IconHash size="1rem" />
      default:
        return <IconPointFilled size="1rem" />
    }
  }

  const CategoryColor = (): string => {
    const category = node.attrs.category;
    switch(category) {
      case "user":
        return "blue"
      case "document":
        return "green"
      case "toturial":
        return "cyan"
      case "topic":
        return "dark"
      default:
        return "dark"
    }
  }

  return (
    <NodeViewWrapper as="span">
      <HoverCard withArrow shadow="lg" withinPortal>
        <HoverCard.Target>
          <Badge
            tt="revert"
            component="span"
            pl={0}
            color={CategoryColor()}
            size="xs"
            radius="xs"
            mx={2}
            my={0}
            variant="filled"
            leftSection={
              <ActionIcon color={CategoryColor()} variant="filled" radius="xs" size="xs" style={{ border: 0 }}>
                <CategoryIcon />
              </ActionIcon>
            }
          >
              {node.attrs.label }
          </Badge>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          aaaa
        </HoverCard.Dropdown>
      </HoverCard>
    </NodeViewWrapper>
  );
}