import { useState } from "react";

function TreeNode({
  node,
  depth = 0,
  selectedId,
  onSelect,
  expandedIds,
  onToggle,
  focusedId,
}) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";
  const isSelected = node.id === selectedId;
  const isFocused = node.id === focusedId;

  const handleRowClick = () => {
    if (isFolder) {
      onToggle(node.id);
    } else {
      onSelect(node);
    }
  };
  return (
    <div className="tree-node">
      <div
        id={`tree-item-${node.id}`}
        className={[
          "tree-row",
          isSelected && "tree-row--selected",
          isFocused && "tree-row--focused",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleRowClick}
        role="treeitem"
        aria-expanded={isFolder ? isOpen : undefined}
        aria-selected={isSelected}
      >
        {isFolder && (
          <span className="tree-caret">
            {isOpen ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path
                  d="M1 3l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path
                  d="M3 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        )}
        <span className="tree-icon">
          {isFolder ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          )}
        </span>
        <span className="tree-name">{node.name}</span>
        {!isFolder && <span className="tree-size">{node.size}</span>}
      </div>

      {isFolder &&
        isOpen &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
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

export default TreeNode;
