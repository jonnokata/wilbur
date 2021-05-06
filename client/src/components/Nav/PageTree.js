import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Tree, { mutateTree, moveItemOnTree } from "@atlaskit/tree";
import Tooltip from "@atlaskit/tooltip";
import { ButtonItem } from "@atlaskit/menu";
import Button, { ButtonGroup } from "@atlaskit/button";
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right";
import ChevronDownIcon from "@atlaskit/icon/glyph/chevron-down";
import EditorAddIcon from "@atlaskit/icon/glyph/editor/add";
import { Database } from "../../firebase";

// const PADDING_PER_LEVEL = 16;

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

const PageTreeItem = styled.div`
  width: calc(100% - 32px);
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PageTree = ({ onDocumentSelect, pages: allPages }) => {
  const [tree, setTree] = useState();

  useEffect(() => {
    const newTree = {
      rootId: "root",
      items: {
        root: {
          id: "root",
          children: [],
        },
      },
    };
    allPages.forEach((page) => {
      const id = page.documentId;
      const title = page.documentTitle;
      if (id && title.trim().length > 0) {
        console.log(id);
        newTree.items[id] = {
          id,
          children: [],
          data: page,
        };
        newTree.items["root"].children.push(id);
      }
    });
    setTree(newTree);
  }, [allPages]);

  const renderItem = useCallback(({ item, onExpand, onCollapse, provided }) => {
    const handleClick = () => {
      console.log("🚀 Selecting document with id", item.data.documentId);
      onDocumentSelect(item.data.documentId);
    };
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        onClick={handleClick}
      >
        <PageTreeItem>
          <span>{item.data ? item.data.documentTitle : ""}</span>
        </PageTreeItem>
      </div>
    );
  }, []);

  const onExpand = useCallback(
    (itemId) => {
      setTree({
        tree: mutateTree(tree, itemId, { isExpanded: true }),
      });
    },
    [tree]
  );

  const onCollapse = useCallback(
    (itemId) => {
      setTree({
        tree: mutateTree(tree, itemId, { isExpanded: false }),
      });
    },
    [tree]
  );

  const onDragEnd = useCallback(
    (source, destination) => {
      console.log({ source, destination });
      if (!destination) {
        return;
      }
      const newTree = moveItemOnTree(tree, source, destination);
      setTree({
        tree: newTree,
      });
    },
    [tree]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tree ? (
        <div>
          {
            <Tree
              tree={tree}
              renderItem={renderItem}
              onExpand={onExpand}
              onCollapse={onCollapse}
              onDragEnd={onDragEnd}
              offsetPerLevel={16}
            />
          }
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export { PageTree };
