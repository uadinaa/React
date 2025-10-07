import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DogList from "./DogList.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DogList />
  </StrictMode>,
)
