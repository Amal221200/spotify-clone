import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import PlayerProvider from './context/PlayerProvider.tsx'
import MusicMenuProvider from './context/MusicMenuProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayerProvider>
      <MusicMenuProvider>
        <RouterProvider router={router} />
      </MusicMenuProvider>
    </PlayerProvider>
  </React.StrictMode>,
)
