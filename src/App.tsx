import { Route, Routes } from "react-router"
import NavbarDashboard from "./components/NavbarDashboard"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/NotFoundPage"
import PatientsListPage from "./pages/PatientPages/PatientsListPage";
import PatientInfoPage from "./pages/PatientPages/PatientInfoPage";
import NewPatientPage from "./pages/PatientPages/NewPatientPage";
import SessionListPage from "./pages/SessionPages/SessionListPage";
import SessionInfoPage from "./pages/SessionPages/SessionInfoPage";
import NewSessionPage from "./pages/SessionPages/NewSessionPage";
import TreatmentInfoPage from "./pages/TreatmentPages/TreatmentInfoPage";
import NewTreatmentPage from "./pages/TreatmentPages/NewTreatmentPage";

function App() {
  
  
  return (
    <>
      <NavbarDashboard />
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        
        <Route path="/patients" element={<PatientsListPage />}></Route>
        <Route path="/patients/:patientId" element={<PatientInfoPage />}></Route>
        <Route path="/new-patient" element={<NewPatientPage />}></Route>
        
        <Route path="/sessions" element={<SessionListPage />}></Route>
        <Route path="/sessions/:sessionId" element={<SessionInfoPage />}></Route>
        <Route path="/patients/:patientId/new-session" element={<NewSessionPage />}></Route>
        
        <Route path="/treatment-info/:treatmentId" element={<TreatmentInfoPage />}></Route>
        <Route path="/patients/:patientId/new-treatment" element={<NewTreatmentPage />}></Route>
       
        
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App
