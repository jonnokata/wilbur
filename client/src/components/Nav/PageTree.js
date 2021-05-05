import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from "@atlaskit/tree";
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

const getIcon = (item, onExpand, onCollapse) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ? (
      <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
    ) : (
      <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
    );
  }
  return <PreTextIcon></PreTextIcon>;
};

// id: ItemId;
// children: ItemId[];
// hasChildren?: boolean;
// isExpanded?: boolean;
// isChildrenLoading?: boolean;
// data?: TreeItemData;

const PageTree = () => {
  const [tree, setTree] = useState();

  useEffect(() => {
    const fn = async () => {
      const allPages = await Database.collection("pages").get();
      const newTree = {
        rootId: "root",
        items: {
          root: {
            id: "root",
            children: [],
          },
        },
      };
      allPages.docs.forEach((doc) => {
        const data = doc.data();

        const id = data.documentId;
        if (id) {
          console.log(id);
          newTree.items[id] = {
            id,
            children: [],
            data: data,
          };
          newTree.items["root"].children.push(id);
        }
      });
      console.log(newTree);
      setTree(newTree);
    };
    fn();
  }, []);

  const renderItem = useCallback(({ item, onExpand, onCollapse, provided }) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>{item.data ? item.data.documentTitle : ""}</span>
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
              isDragEnabled
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

// const getIcon = (item, onExpand, onCollapse) => {
//   if (item.children && item.children.length > 0) {
//     return item.isExpanded ? (
//       <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
//     ) : (
//       <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
//     );
//   }
//   return <PreTextIcon></PreTextIcon>;
// };

// const PageTree = () => {

// const renderItem = ({}) => {};

//   const onExpand = ({}) => {};

//   const onCollapse = ({}) => {};

//   const onDragEnd = ({}) => {};

// }

// return ()
