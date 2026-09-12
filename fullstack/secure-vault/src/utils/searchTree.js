export function getMatchingIds(nodes, query) {
  const matchIds = new Set();
  const ancestorIds = new Set();

  const lowerQuery = query.toLowerCase();

  function walk(node, ancestors) {
    const isMatch = node.name.toLowerCase().includes(lowerQuery);

    if (isMatch) {
      matchIds.add(node.id);
      ancestors.forEach((id) => ancestorIds.add(id));
    }

    if (node.children?.length) {
      node.children.forEach((child) => walk(child, [...ancestors, node.id]));
    }
  }

  nodes.forEach((node) => walk(node, []));

  return { matchIds, ancestorIds };
}
