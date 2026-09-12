export function flattenVisibleTree(
  nodes,
  expandedIds,
  depth = 0,
  parentId = null,
) {
  let result = [];

  for (const node of nodes) {
    result.push({ ...node, depth, parentId });

    if (
      node.type === "folder" &&
      expandedIds.has(node.id) &&
      node.children?.length
    ) {
      result = result.concat(
        flattenVisibleTree(node.children, expandedIds, depth + 1, node.id),
      );
    }
  }

  return result;
}
