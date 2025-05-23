import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PlayGame from "./PlayGame.tsx";

import "./main.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayGame />
  </StrictMode>,
)
