import { useState } from 'react'
import './App.css'
import FolderTree from './components/FolderTree';
import data from "../data.json"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <aside className="explorer-panel">
        <FolderTree data={data} />
      </aside>
    </div>
  )
}

export default App
