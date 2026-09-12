import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import "./App.css";
import FolderTree from "./components/FolderTree";
import data from "../data.json";
import PropertiesPanel from "./components/PropertiesPanel";
import { useExpanded } from "./hooks/useExpanded";
import { flattenVisibleTree } from "./utils/flattenTree";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [focusedId, setFocusedId] = useState(data[0]?.id ?? null);
  const { expandedIds, toggle, expand, collapse } = useExpanded(
    data.map((n) => n.id),
  );
  const explorerRef = useRef(null);

  const visibleNodes = useMemo(
    () => flattenVisibleTree(data, expandedIds),
    [expandedIds],
  );

  const focusedIndex = visibleNodes.findIndex((n) => n.id === focusedId);

  const handleKeyDown = useCallback(
    (e) => {
      const node = visibleNodes[focusedIndex];
      if (!node) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next =
            visibleNodes[Math.min(focusedIndex + 1, visibleNodes.length - 1)];
          if (next) setFocusedId(next.id);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = visibleNodes[Math.max(focusedIndex - 1, 0)];
          if (prev) setFocusedId(prev.id);
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          if (node.type === "folder") {
            if (!expandedIds.has(node.id)) {
              expand(node.id);
            } else if (node.children?.length) {
              setFocusedId(node.children[0].id);
            }
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          if (node.type === "folder" && expandedIds.has(node.id)) {
            collapse(node.id);
          } else if (node.parentId) {
            setFocusedId(node.parentId);
          }
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (node.type === "file") {
            setSelectedFile(node);
          } else {
            toggle(node.id);
          }
          break;
        }
        default:
          break;
      }
    },
    [visibleNodes, focusedIndex, expandedIds, expand, collapse, toggle],
  );

  useEffect(() => {
    document
      .getElementById(`tree-item-${focusedId}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [focusedId]);

  return (
    <div className="app">
      <aside
        className="explorer-panel"
        ref={explorerRef}
        tabIndex={0}
        role="tree"
        onKeyDown={handleKeyDown}
      >
        <FolderTree
          data={data}
          selectedId={selectedFile?.id}
          onSelect={setSelectedFile}
          expandedIds={expandedIds}
          onToggle={toggle}
          focusedId={focusedId}
        />
      </aside>
      <main className="main-panel">
        <PropertiesPanel file={selectedFile} />
      </main>
    </div>
  );
}

export default App;
