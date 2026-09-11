import type { FlowNode } from "../types";
import { forwardRef } from "react";

interface NodeCardProps {
    node: FlowNode;
    selected: boolean;
    hasError: boolean;
    onClick: (e: React.MouseEvent) => void;
}

const TYPE_COLORS: Record<FlowNode["type"], string> = {
    start: "#10b981",
    question: "#6366f1",
    end: "#f43f5e",
};

export const NodeCard = forwardRef<HTMLDivElement, NodeCardProps>(
    ({ node, selected, hasError, onClick }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                style={{
                    position: "absolute",
                    left: node.position.x,
                    top: node.position.y,
                    width: 220,
                    border: `1px solid ${selected ? "#6366f1" : "#333"}`,
                    borderTop: `4px solid ${TYPE_COLORS[node.type]}`,
                    borderRadius: 6,
                    background: "#1a1a1a",
                    color: "#eee",
                    padding: 12,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: selected ? "0 0 0 2px rgba(99,102,241,0.3)" : "none",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease",

                }}
            >
                <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
                    <span>{node.type.toUpperCase()} · #{node.id}</span>
                    {hasError && <span style={{ color: "#f43f5e" }}>broken link</span>}
                </div>
                <div>{node.text}</div>
            </div>
        );
    }
);