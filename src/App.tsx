import { Routes, Route, HashRouter } from "react-router-dom"
import Speakgpt from "./pages/SpeakGPT/Speakgpt"
import Falle from "./pages/Fall-E/Falle"
import NotFound from "./pages/NotFound/Notfound"
// import LoaderStart from "./components/Loader-starter/LoaderStart"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Speakgpt />} />
      <Route path="/falle" element={<Falle />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export function WrappedApp() {
  return (
    <HashRouter>
      {/* <LoaderStart /> */}
      <App />
    </HashRouter>
  )
}
