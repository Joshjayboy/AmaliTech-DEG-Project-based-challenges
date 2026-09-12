export function findPath(nodes, targetId, trail = []) {
  for (const node of nodes) {
    const currentTrail = [...trail, node];

    if (node.id === targetId) {
      return currentTrail;
    }

    if (node.children?.length) {
      const found = findPath(node.children, targetId, currentTrail);
      if (found) return found;
    }
  }

  return null;
}
