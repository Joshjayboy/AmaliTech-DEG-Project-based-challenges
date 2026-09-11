import type { FlowNode } from "../types";

interface NodeCardProps {
    node: FlowNode;
}

const TYPE_COLORS: Record<FlowNode["type"], string> = {
    start: "#10b981",
    question: "#6366f1",
    end: "#f43f5e",
};

export function NodeCard({ node }: NodeCardProps) {
    return (
        <div
            style={{
                position: "absolute",
                left: node.position.x,
                top: node.position.y,
                width: 220,
                border: "1px solid #333",
                borderTop: `4px solid ${TYPE_COLORS[node.type]}`,
                borderRadius: 6,
                background: "#1a1a1a",
                color: "#eee",
                padding: 12,
                fontSize: 13,
            }}
        >
            <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 4 }}>
                {node.type.toUpperCase()} · #{node.id}
            </div>
            <div>{node.text}</div>
        </div>
    );
}