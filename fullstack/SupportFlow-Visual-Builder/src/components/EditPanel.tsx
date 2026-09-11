import { useState, useEffect } from "react";
import type { FlowNode } from "../types";

interface EditPanelProps {
    node: FlowNode;
    onUpdate: (id: string, text: string) => void;
    onClose: () => void;
}

export function EditPanel({ node, onUpdate, onClose }: EditPanelProps) {
    const [text, setText] = useState(node.text);

    useEffect(() => {
        onUpdate(node.id, text);
    }, [text]);

    return (
        <div style={{ width: 280, background: "#111", borderLeft: "1px solid #333", padding: 16, color: "#eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Edit Node #{node.id}</span>
                <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", cursor: "pointer" }}>×</button>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 4, color: "#eee", padding: 8, fontSize: 13 }}
            />
        </div>
    );
}