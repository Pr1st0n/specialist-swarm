import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DealList } from './pages/DealList'
import { DealDetail } from './pages/DealDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DealList />} />
        <Route path="/deal/:slug" element={<DealDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
