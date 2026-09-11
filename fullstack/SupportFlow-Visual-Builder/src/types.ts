export type NodeType = "start" | "question" | "end";

export interface Option {
    label: string;
    nextId: string;
}

export interface FlowNode {
    id: string;
    type: NodeType;
    text: string;
    position: { x: number; y: number };
    options: Option[];
}