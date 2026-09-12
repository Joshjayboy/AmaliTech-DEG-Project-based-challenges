import { useState } from 'react';

function TreeNode({ node, depth = 0 }) {
    const [isOpen, setIsOpen] = useState(depth === 0);
    const isFolder = node.type === 'folder';
    const hasChildren = isFolder && node.children?.length > 0;

    const handleToggle = () => {
        if (isFolder) setIsOpen((prev) => !prev);
    };

    return (
        <div className="tree-node">
            <div
                className="tree-row"
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={handleToggle}
            >
                {isFolder && (
                    <span className="tree-caret">{isOpen ? 'Open' : 'Close'}</span>
                )}
                <span className="tree-icon">{isFolder ? 'Folder' : 'File'}</span>
                <span className="tree-name">{node.name}</span>
                {!isFolder && <span className="tree-size">{node.size}</span>}
            </div>

            {isFolder && node.children?.map((child) => (
                <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
        </div>
    );
}

export default TreeNode;