import { useState } from 'react';
import { NodeCard } from "./components/NodeCard";
import type { FlowNode } from "./types";
import flowData from "../flow_data.json";
import './App.css'
import { Connectors } from "./components/Connectors";

function App() {
  const [nodes] = useState<FlowNode[]>(flowData.nodes as FlowNode[]);
  return (
    <>
      <div style={{ width: "100%", height: "100vh", background: "#0a0a0a" }}>
        <div style={{ position: "relative", width: 1200, height: 800 }}>
          <Connectors nodes={nodes} />
          {nodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
