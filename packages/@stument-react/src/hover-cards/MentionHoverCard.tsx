import { HoverCard, Text } from "@mantine/core";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import React from "react";

export const HoverCardBadge = ({ node }: NodeViewProps) => {
  return (
    <NodeViewWrapper as="span">
      <HoverCard withArrow shadow="lg" withinPortal openDelay={1000}>
        <HoverCard.Target>
          <Text component="span" className="hover-card_at-text">
            @{node.attrs.label}
          </Text>
        </HoverCard.Target>
        <HoverCard.Dropdown>aawwwaa</HoverCard.Dropdown>
      </HoverCard>
    </NodeViewWrapper>
  );
};
