function Breadcrumbs({ path, onNavigate }) {
  if (!path || path.length === 0) {
    return (
      <div className="breadcrumbs breadcrumbs--empty">No file selected</div>
    );
  }

  return (
    <nav className="breadcrumbs" aria-label="File path">
      {path.map((node, index) => (
        <span key={node.id} className="breadcrumb-segment">
          <button
            className="breadcrumb-link"
            onClick={() => onNavigate(node)}
            disabled={index === path.length - 1}
          >
            {node.name}
          </button>
          {index < path.length - 1 && <span className="breadcrumb-sep">/</span>}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
