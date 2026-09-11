import { useState } from "react";
import type { FlowNode } from "../types";

interface PreviewModeProps {
    nodes: FlowNode[];
    onExit: () => void;
}

export function PreviewMode({ nodes, onExit }: PreviewModeProps) {
    const [currentId, setCurrentId] = useState("1");
    const currentNode = nodes.find((n) => n.id === currentId);
    const isLeaf = currentNode?.options.length === 0;


    const handleSelect = (nextId: string) => {
        setCurrentId(nextId);
    };

    const restart = () => {
        setCurrentId("1");
    };


    return (
        <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", color: "#eee", display: "flex", flexDirection: "column", alignItems: "center", padding: 24 }}>
            <button onClick={onExit} style={{ alignSelf: "flex-start", background: "none", border: "1px solid #333", color: "#ccc", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>
                Back to Editor
            </button>

            <div style={{ marginTop: 60, maxWidth: 400, width: "100%" }}>
                <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                    {currentNode?.text}
                </div>

                {isLeaf ? (
                    <button onClick={restart} style={{ background: "#6366f1", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 6, cursor: "pointer" }}>
                        ↺ Restart
                    </button>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {currentNode?.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(opt.nextId)}
                                style={{ background: "#1a1a1a", border: "1px solid #333", color: "#eee", padding: "10px 14px", borderRadius: 6, cursor: "pointer", textAlign: "left" }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}