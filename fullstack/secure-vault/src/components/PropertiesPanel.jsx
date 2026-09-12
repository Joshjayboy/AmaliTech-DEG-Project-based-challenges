function PropertiesPanel({ file }) {
    if (!file) {
        return (
            <div className="properties-panel properties-panel--empty">
                <p>Select a file to view its properties.</p>
            </div>
        );
    }

    return (
        <div className="properties-panel">
            <h2>Properties</h2>
            <dl>
                <dt>Name</dt>
                <dd>{file.name}</dd>
                <dt>Type</dt>
                <dd>{file.type}</dd>
                <dt>Size</dt>
                <dd>{file.size ?? '—'}</dd>
            </dl>
        </div>
    );
}

export default PropertiesPanel;