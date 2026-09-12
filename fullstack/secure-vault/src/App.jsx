import { useState } from 'react'
import './App.css'
import FolderTree from './components/FolderTree';
import data from "../data.json"
import PropertiesPanel from './components/PropertiesPanel';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className='app'>
      <aside className="explorer-panel">
        <FolderTree
          data={data}
          selectedId={selectedFile?.id}
          onSelect={setSelectedFile} />
      </aside>
      <main className="main-panel">
        <PropertiesPanel file={selectedFile} />
      </main>
    </div>
  )
}

export default App
