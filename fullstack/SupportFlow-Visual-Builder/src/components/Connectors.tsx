import type { FlowNode } from "../types";

const NODE_WIDTH = 220;
const NODE_HEIGHT = 90;

interface ConnectorsProps {
    nodes: FlowNode[];
    nodeHeights: Record<string, number>;
}

export function Connectors({ nodes, nodeHeights }: ConnectorsProps) {
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
            <defs>
                <marker
                    id="arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3"
                    orient="auto"
                >
                    <path d="M0,0 L0,6 L8,3 z" fill="#555" />
                </marker>
            </defs>
            {nodes.map((node) =>
                node.options.map((opt, i) => {
                    const target = nodeMap.get(opt.nextId);
                    if (!target) return null;

                    const x1 = node.position.x + NODE_WIDTH / 2;
                    const y1 = node.position.y + (nodeHeights[node.id] ?? NODE_HEIGHT);
                    const x2 = target.position.x + NODE_WIDTH / 2;
                    const y2 = target.position.y;

                    const dy = y2 - y1;
                    const controlOffset = Math.abs(dy) * 0.5;

                    const path = `M ${x1} ${y1} C ${x1} ${y1 + controlOffset}, ${x2} ${y2 - controlOffset}, ${x2} ${y2}`;

                    return (
                        <path
                            key={`${node.id}-${opt.nextId}-${i}`}
                            d={path}
                            fill="none"
                            stroke="#555"
                            strokeWidth={1.5}
                            markerEnd="url(#arrow)"
                        />
                    );
                })
            )}
        </svg>
    );
}