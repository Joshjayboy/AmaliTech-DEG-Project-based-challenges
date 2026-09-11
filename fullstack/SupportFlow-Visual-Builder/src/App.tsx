import { useState, useRef, useEffect, useCallback } from 'react';
import { NodeCard } from "./components/NodeCard";
import type { FlowNode } from "./types";
import flowData from "../flow_data.json";
import './App.css'
import { Connectors } from "./components/Connectors";
import { EditPanel } from "./components/EditPanel";
import { PreviewMode } from "./components/PreviewMode";

export default function App() {
  const [nodes, setNodes] = useState<FlowNode[]>(flowData.nodes as FlowNode[]);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [nodeHeights, setNodeHeights] = useState<Record<string, number>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"editor" | "preview">("editor");

  const measureHeights = useCallback(() => {
    const heights: Record<string, number> = {};
    for (const [id, el] of Object.entries(nodeRefs.current)) {
      if (el) heights[id] = el.offsetHeight;
    }
    setNodeHeights(heights);
  }, []);

  useEffect(() => {
    measureHeights();
  }, [nodes, measureHeights]);

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? null;

  const handleUpdateText = (id: string, text: string) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  };

  if (mode === "preview") {
    return <PreviewMode nodes={nodes} onExit={() => setMode("editor")} />;
  }


  return (
    <div style={{ width: "100%", height: "100vh", background: "#0a0a0a", display: "flex" }}>
      <div style={{ position: "relative", flex: 1, overflow: "äuto" }}
        onClick={() => setSelectedId(null)}
      >
        <div style={{ position: "relative", width: 1200, height: 800 }}>

          <Connectors nodes={nodes} nodeHeights={nodeHeights} />
          {nodes.map((node) => (
            <NodeCard key={node.id} node={node} selected={node.id === selectedId} ref={(el) => { nodeRefs.current[node.id] = el; }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(node.id === selectedId ? null : node.id);
              }}
            />
          ))}

          <button onClick={() => setMode("preview")} style={{ background: "#6366f1", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}>
            Preview
          </button>
        </div>
      </div>

      {selectedNode && (
        <EditPanel
          key={selectedNode.id}
          node={selectedNode}
          onUpdate={handleUpdateText}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}

