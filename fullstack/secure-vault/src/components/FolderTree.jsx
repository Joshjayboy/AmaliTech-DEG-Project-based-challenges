import TreeNode from "./TreeNode";

function FolderTree({
  data,
  selectedId,
  onSelect,
  expandedIds,
  onToggle,
  focusedId,
}) {
  return (
    <div className="folder-tree">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
          expandedIds={expandedIds}
          onToggle={onToggle}
          focusedId={focusedId}
        />
      ))}
    </div>
  );
}

export default FolderTree;
