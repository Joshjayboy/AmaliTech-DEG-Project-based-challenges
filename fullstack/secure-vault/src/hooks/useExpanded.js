import { useState, useCallback } from 'react';

export function useExpanded(initialOpenIds = []) {
    const [expandedIds, setExpandedIds] = useState(new Set(initialOpenIds));

    const toggle = useCallback((id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const expand = useCallback((id) => {
        setExpandedIds((prev) => new Set(prev).add(id));
    }, []);

    const collapse = useCallback((id) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, []);

    return { expandedIds, toggle, expand, collapse, setExpandedIds };
}