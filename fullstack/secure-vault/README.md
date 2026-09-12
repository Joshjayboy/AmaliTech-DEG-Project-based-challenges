# SecureVault Dashboard

A high performance file explorer built for SecureVault's enterprise cloud storage clients. Designed for legal and financial teams who need to navigate deeply nested case files and records without friction recursive folder structures of any depth, full keyboard navigation, and instant search with automatic path expansion.


*Live Demo:* [https://secure-vault-psi-nine.vercel.app/](https://secure-vault-psi-nine.vercel.app/)
---

## Overview

SecureVault's backend already returns folder hierarchies efficiently; the gap was on the frontend, where a flat list made it painful for clients to manage nested files. This project replaces that with a proper tree-based explorer, built from scratch with no external UI component libraries, styled to a dark, precise, "cyber-secure" aesthetic.

## Features

- **Recursive folder tree** => renders folder structures of arbitrary depth (tested well beyond the required 2–20 levels)
- **Expand/collapse** => click any folder to reveal or hide its contents
- **File selection & metadata** => select a file to view its name, type, and size in a dedicated properties panel
- **Full keyboard navigation** => arrow keys move focus, expand, and collapse; Enter selects
- **Breadcrumb trail** *(wildcard feature)* => always know exactly where a selected file lives in the hierarchy
- **Search & filter** *(bonus feature)* => filter by name; folders containing a match auto-expand, and unrelated results dim out
- **Accessible by design** => ARIA tree roles, live-region announcements for search results, and screen-reader-friendly labeling throughout

## Tech Stack

- **React** (Vite) for component architecture and state management
- **Vanilla CSS** with custom properties. No CSS framework, no component library
- **No external dependencies** for tree rendering, drag and drop, or UI primitives. Every component is hand-built

## Project Structure

```
securevault-dashboard/
├── data.json                      # Source folder and file data (provided, unmodified)
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Top-level state: selection, focus, search, expansion
│   ├── App.css                    # Global styles, layout, component classes
│   ├── styles/
│   │   └── tokens.css             # Design system tokens (color, spacing, typography)
│   ├── components/
│   │   ├── FolderTree.jsx         # Renders the root-level list of TreeNodes
│   │   ├── TreeNode.jsx           # Recursive node that renders itself for each child
│   │   ├── PropertiesPanel.jsx    # Displays metadata for the selected file
│   │   ├── Breadcrumbs.jsx        # Path trail to the selected file
│   │   └── SearchBar.jsx          # Search input with clear control
│   ├── hooks/
│   │   └── useExpanded.js         # Shared expand and collapse state (Set of open folder IDs)
│   └── utils/
│       ├── flattenTree.js         # Flattens visible (non-collapsed) nodes for keyboard nav
│       ├── findPath.js            # Traces root, selected-node ancestry for breadcrumbs
│       └── searchTree.js          # Finds matching nodes and their ancestor folder IDs
└── README.md
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
git clone <your-fork-url>
cd securevault-dashboard
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

## Architecture

### Recursive Rendering Strategy

The tree is built around a single component, `TreeNode`, which renders itself once per child of a folder. There is no depth limit baked into the component, a folder 20 levels deep is rendered by the exact same code path as one at the top level, just with a larger `depth` value used for indentation. This keeps the component simple and guarantees it scales to whatever nesting the backend sends.

Rather than let each `TreeNode` manage its own open or closed state locally, expand/collapse state is lifted into a single source of truth: a `Set` of open folder IDs (`expandedIds`), owned by `App` and managed through the `useExpanded` hook. Every `TreeNode` simply checks whether its own ID is in that set. This centralization is what makes keyboard navigation and search possible, both features need to reason about "what's currently visible" across the *whole* tree, not just within one node's local state.

To support keyboard navigation efficiently, `flattenVisibleTree` walks the full data structure once per state change and produces a flat array containing only the nodes that are actually visible (thatis, not hidden inside a collapsed folder). Arrow-key navigation then becomes simple array index math instead of traversing the DOM or the nested data structure on every keypress.

### State Management

All interactive state lives in `App.jsx`:

| State | Purpose |
|---|---|
| `expandedIds` | Which folders are currently open (drives rendering and keyboard expand/collapse) |
| `selectedFile` | The currently selected file, shown in the properties panel and breadcrumbs |
| `focusedId` | Which row currently has keyboard focus, independent of selection |
| `searchQuery` | The active search string |

Search does not overwrite `expandedIds`. Instead, an `effectiveExpandedIds` value is computed by merging the user's manually opened folders with the ancestor folders required to reveal search matches. This means clearing a search restores exactly the expand/collapse state the user had before searching — nothing is lost.

### Keyboard Navigation

The explorer panel implements a `treeitem`/`tree` ARIA pattern:

- **↑ / ↓** => move focus to the previous/next visible row
- **→** => expand a focused folder, or move focus into its first child if already expanded
- **←** => collapse a focused folder, or move focus to its parent if already collapsed
- **Enter** => select a focused file, or toggle a focused folder

Focus state (`focusedId`) is tracked separately from selection (`selectedFile`), matching how most modern file explorers behave, you can arrow through the tree without changing what's shown in the properties panel until you commit with Enter or a click.

## Wildcard Feature: Breadcrumb Trail

**The gap:** once a user selects a file several folders deep, nothing in the UI shows where that file actually lives. In a tool used by lawyers and bank staff managing thousands of nested case files, losing track of location is a real, everyday friction point, not a hypothetical one.

**The solution:** a breadcrumb trail above the properties panel traces the full path from root to the selected file. Each intermediate segment is clickable, moving keyboard focus directly to that ancestor folder without needing to manually re-navigate the tree. It's implemented via `findPath`, which walks the tree once to build the ancestry chain for any given node ID.

This pairs naturally with search: when a search match is deep in the hierarchy, the breadcrumb immediately shows the user the full context of where that result lives, reducing the "found it, but where am I?" moment that plain highlighting alone doesn't solve.

## Search & Filter

Typing in the search bar filters by name against every node in the tree (folders and files alike). Two things happen simultaneously:

1. Matching nodes are highlighted; non-matching nodes are dimmed.
2. Any folder that contains a match anywhere in its subtree is automatically force-expanded, even if the user never manually opened it.

This is computed in a single pass (`getMatchingIds`) that returns both the matching node IDs and the set of ancestor folder IDs that must be opened to reveal them, avoiding a second tree walk. Clearing the search reverts the tree to the user's manual expand or collapse state exactly as it was.

## Accessibility

- Tree structure exposed via `role="tree"` / `role="treeitem"`, with `aria-expanded`, `aria-selected`, and `aria-level` reflecting live state
- Full keyboard operability, no functionality requires a mouse
- Live-region announcement of search result counts for screen reader users
- Visible focus indicator distinct from selection state, so keyboard users always know where they are independent of what's selected

## Known Constraints

- No component libraries (Bootstrap, Material UI, Chakra UI, Ant Design) were used, every UI element is custom-built per the assignment constraints
- `data.json` is used exactly as provided and is not restructured