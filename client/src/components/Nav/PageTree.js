import React, { useState } from "react";
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

const PageTree = () => {
  // const PADDING_PER_LEVEL = 16;

  // const PreTextIcon = styled.span`
  //   display: inline-block;
  //   width: 16px;
  //   justify-content: center;
  //   cursor: pointer;
  // `;

  // type State = {
  //   tree: TreeData,
  // };

  // const getIcon = (
  //   item: TreeItem,
  //   onExpand: (itemId: ItemId) => void,
  //   onCollapse: (itemId: ItemId) => void
  // ) => {
  //   if (item.children && item.children.length > 0) {
  //     return item.isExpanded ? (
  //       <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
  //     ) : (
  //       <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
  //     );
  //   }
  //   return <PreTextIcon>&bull;</PreTextIcon>;
  // };

  // export default class PureTree extends Component<void, State> {
  //   state = {
  //     tree: treeWithTwoBranches,
  //   };

  //   renderItem = ({
  //     item,
  //     onExpand,
  //     onCollapse,
  //     provided,
  //   }: RenderItemParams) => {
  //     return (
  //       <div
  //         ref={provided.innerRef}
  //         {...provided.draggableProps}
  //         {...provided.dragHandleProps}
  //       >
  //         <span>{getIcon(item, onExpand, onCollapse)}</span>
  //         <span>{item.data ? item.data.title : ""}</span>
  //       </div>
  //     );
  //   };

  //   onExpand = (itemId: ItemId) => {
  //     const { tree }: State = this.state;
  //     this.setState({
  //       tree: mutateTree(tree, itemId, { isExpanded: true }),
  //     });
  //   };

  //   onCollapse = (itemId: ItemId) => {
  //     const { tree }: State = this.state;
  //     this.setState({
  //       tree: mutateTree(tree, itemId, { isExpanded: false }),
  //     });
  //   };

  //   onDragEnd = (
  //     source: TreeSourcePosition,
  //     destination?: TreeDestinationPosition
  //   ) => {
  //     const { tree } = this.state;

  //     if (!destination) {
  //       return;
  //     }
  //     const newTree = moveItemOnTree(tree, source, destination);
  //     this.setState({
  //       tree: newTree,
  //     });
  //   };

  //   render() {
  //     const { tree } = this.state;

  //     return (
  //       <Tree
  //         tree={tree}
  //         renderItem={this.renderItem}
  //         onExpand={this.onExpand}
  //         onCollapse={this.onCollapse}
  //         onDragEnd={this.onDragEnd}
  //         offsetPerLevel={PADDING_PER_LEVEL}
  //         isDragEnabled
  //       />
  //     );
  //   }
  // }

  return <div>PAGE</div>;
};

export { PageTree };
