function TreeNode({ node, depth = 0 }) {
    const isFolder = node.type === 'folder';

    return (
        <div className="tree-node">
            <div
                className="tree-row"
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
            >
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