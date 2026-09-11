import type { FlowNode } from "../types";

export function findBrokenLinkNodeIds(nodes: FlowNode[]): Set<string> {
    const validIds = new Set(nodes.map((n) => n.id));
    const brokenNodeIds = new Set<string>();

    for (const node of nodes) {
        for (const opt of node.options) {
            if (!validIds.has(opt.nextId)) {
                brokenNodeIds.add(node.id);
            }
        }
    }

    return brokenNodeIds;
}