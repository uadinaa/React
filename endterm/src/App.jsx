import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import OfflineBanner from "./components/OfflineBanner.jsx";
import "./App.css"

function App() {
  return (
      <div>
          <Header />
          <OfflineBanner />
          <main style={{ padding: "20px" }}>
              <Outlet /> {}
          </main>
      </div>
  )
}

export default App;