import TreeNode from './TreeNode';

function FolderTree({ data, selectedId, onSelect }) {
    return (
        <div className="folder-tree" role="tree">
            {data.map((node) => (
                <TreeNode key={node.id} node={node} depth={0} selectedId={selectedId}
                    onSelect={onSelect} />
            ))}
        </div>
    );
}

export default FolderTree;