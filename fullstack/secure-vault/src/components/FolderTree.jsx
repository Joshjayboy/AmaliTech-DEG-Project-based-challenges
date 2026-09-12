import TreeNode from "./TreeNode";

function FolderTree({
  data,
  selectedId,
  onSelect,
  expandedIds,
  onToggle,
  focusedId,
  matchIds,
  isSearching,
}) {
  return (
    <div className="folder-tree">
      {isSearching && matchIds.size === 0 && (
        <div className="empty-state">No matches found</div>
      )}
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
          matchIds={matchIds}
          isSearching={isSearching}
        />
      ))}
    </div>
  );
}

export default FolderTree;
