import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import PlayGame from "./PlayGame.tsx";
import HowToPlay from "./HowToPlay.tsx";
import CreateGame from "./CreateGame.tsx";
import Layout from "./Layout.tsx";

import "tailwindcss/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<PlayGame />} />
          <Route path="/about" element={<HowToPlay />} />
          <Route path="/create" element={<CreateGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
