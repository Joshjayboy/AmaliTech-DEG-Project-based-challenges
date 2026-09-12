
import TreeNode from './TreeNode';

function FolderTree({ data }) {
    return (
        <div className="folder-tree" role="tree">
            {data.map((node) => (
                <TreeNode key={node.id} node={node} depth={0} />
            ))}
        </div>
    );
}

export default FolderTree;