import { BrowserRouter, Routes, Route } from "react-router-dom"
import Search from "./Components/Search/Search"
import Card from "./Components/Card/Card"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path="/Weather/:name" element={<Card />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
