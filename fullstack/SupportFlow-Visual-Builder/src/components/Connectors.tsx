import type { FlowNode } from "../types";

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

interface ConnectorsProps {
    nodes: FlowNode[];
}

export function Connectors({ nodes }: ConnectorsProps) {
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    return (
        <svg
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1200,
                height: 800,
                pointerEvents: "none",
            }}
        >
            {nodes.map((node) =>
                node.options.map((opt, i) => {
                    const target = nodeMap.get(opt.nextId);
                    if (!target) return null;

                    const x1 = node.position.x + NODE_WIDTH / 2;
                    const y1 = node.position.y + NODE_HEIGHT;
                    const x2 = target.position.x + NODE_WIDTH / 2;
                    const y2 = target.position.y;

                    return (
                        <line
                            key={`${node.id}-${opt.nextId}-${i}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#555"
                            strokeWidth={1.5}
                        />
                    );
                })
            )}
        </svg>
    );
}