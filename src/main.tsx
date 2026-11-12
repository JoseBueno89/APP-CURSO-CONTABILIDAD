import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { ProgressProvider } from './lib/progress'
import Layout from './components/Layout'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage'
import ModelosPage from './pages/ModelosPage'
import ModeloViewer from './pages/ModeloViewer'
import GlosarioPage from './pages/GlosarioPage'
import RedFlagsPage from './pages/RedFlagsPage'
import CrucePage from './pages/CrucePage'
import CertificadoPage from './pages/CertificadoPage'

// Registrar el service worker solo en la versión publicada (no durante el desarrollo)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="curso/:courseId" element={<CoursePage />} />
            <Route path="curso/:courseId/:lessonId" element={<LessonPage />} />
            <Route path="modelos" element={<ModelosPage />} />
            <Route path="modelos/:id" element={<ModeloViewer />} />
            <Route path="glosario" element={<GlosarioPage />} />
            <Route path="red-flags" element={<RedFlagsPage />} />
            <Route path="cruce" element={<CrucePage />} />
            <Route path="certificado" element={<CertificadoPage />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  </StrictMode>,
)
