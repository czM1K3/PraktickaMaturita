import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Pages } from './enums/pages'
import Router from './Cyphers/router'

function App() {
  const [page, setPage] = useState<Pages>(Pages.SkipEncode)

  return (
    <div>
      {Object.values(Pages).map((p, index) => (
        <button
          onClick={() => {
            setPage(p)
          }}
          key={index}
        >
          {p}
        </button>
      ))}
      <Router page={page} />
    </div>
  )
}

export default App
