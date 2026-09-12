# SupportFlow Visual Builder

A visual decision-tree editor for building, editing, and testing automated customer support chatbot flows, replacing spreadsheet-based configuration with a live, explorable flowchart.

## Overview

SupportFlow AI's chatbot logic was previously configured through a spreadsheet: error-prone, hard to visualize, and inaccessible to non-technical managers. This tool renders that same conversation logic as an interactive graph, lets managers edit question text directly on the canvas, and includes a "test drive" mode that simulates the exact experience a real customer would have.

The node rendering, positioning, and connector-drawing logic are built from scratch using SVG and raw DOM coordinates. No flowchart or graph libraries are used.

## Features

**Visual flow graph**
Nodes are rendered from structured JSON data and positioned absolutely on the canvas using explicit x/y coordinates. Parent-to-child relationships are drawn as SVG bezier curves with directional arrowheads, computed dynamically from each node's real rendered dimensions.

**In-place editing**
Selecting a node opens an edit panel where question text can be updated. Changes are reflected on the canvas immediately, held in local component state, no backend or persistence layer required.

**Preview mode**
A single toggle switches the interface from the flowchart editor to a chat-style simulation. The simulation walks the same underlying graph a real customer's conversation would follow, ending in a restart prompt once a leaf node is reached.

**Broken-link validation** *(wildcard feature)*
Any node whose option points to a non-existent target is flagged on the canvas with a warning indicator. Because the flow graph is edited directly by non-technical staff, a mistyped or orphaned reference can silently break part of the live bot; this feature surfaces that failure at edit time rather than in production.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS (utility classes only, no component library)
- Native SVG for all graph rendering and connector logic

No flowchart libraries (react-flow, jsPlumb, mermaid.js) or UI component libraries (Material UI, Bootstrap, Chakra UI) are used anywhere in this project.

## Project Structure

```
src/
├── components/
│   ├── NodeCard.tsx       # Individual flow node, rendered at absolute position
│   ├── Connectors.tsx     # SVG layer drawing bezier connections between nodes
│   ├── EditPanel.tsx      # Side panel for live-editing selected node text
│   └── PreviewMode.tsx    # Chat-style simulation of the live bot experience
├── utils/
│   └── validation.ts      # Broken-link detection logic
├── types.ts                # Shared FlowNode and Option type definitions
├── flow_data.json          # Source data for the conversation graph
└── App.tsx                 # Application state and layout
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

## How It Works

Each node carries an `id`, a `type` (`start` / `question` / `end`), display `text`, a fixed `position`, and a list of `options`, each pointing to another node's `id`. The canvas renders every node at its given coordinates, then a separate SVG layer walks each node's `options` array to draw a curve from the parent's measured bottom edge to the child's top edge, node heights are measured from the live DOM rather than assumed, so connectors stay accurate regardless of how much text a node contains.

Preview mode reuses this same graph structure: starting at the node marked `start`, each selected option moves the simulation to its `nextId`, until a node with no outgoing options is reached.


## Live Demo

The application is deployed on Vercel. [View the live app](https://supportflowvisualbuilder-iota.vercel.app/).