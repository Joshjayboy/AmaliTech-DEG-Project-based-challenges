import { useState, useRef, useEffect, useCallback } from 'react';
import { NodeCard } from "./components/NodeCard";
import type { FlowNode } from "./types";
import flowData from "../flow_data.json";
import './App.css'
import { Connectors } from "./components/Connectors";

export default function App() {
  const [nodes] = useState<FlowNode[]>(flowData.nodes as FlowNode[]);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [nodeHeights, setNodeHeights] = useState<Record<string, number>>({});

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

  return (
    <>
      <div style={{ width: "100%", height: "100vh", background: "#0a0a0a" }}>
        <div style={{ position: "relative", width: 1200, height: 800 }}>
          <Connectors nodes={nodes} nodeHeights={nodeHeights} />
          {nodes.map((node) => (
            <NodeCard key={node.id} node={node} ref={(el) => { nodeRefs.current[node.id] = el; }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

