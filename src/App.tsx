import { Route, Routes } from "react-router"
import NavbarDashboard from "./components/NavbarDashboard"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {

  return (
    <>
      <NavbarDashboard />
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        
        
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App
