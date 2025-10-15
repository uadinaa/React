import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MemeList from "./MemesList.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MemeList />
  </StrictMode>,
)
