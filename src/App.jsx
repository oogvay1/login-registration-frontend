import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom"
import Layout from "./Layouts/Layout"
import Login from "./Pages/Contact/Login"
import User from "./Pages/User/User"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<User />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/contact" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
