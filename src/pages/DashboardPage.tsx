import DashboardCard from "../components/DashboardCard"
import type { Patient, Session } from "../types/types"
interface DashboardPageProps {
  patients: Patient[] | null;
  sessions: Session[] | null;
}

function DashboardPage({ patients, sessions }: DashboardPageProps) {
  console.table(patients);
  return (
    <div>
      <DashboardCard title="Patients" elements={patients} />
      <DashboardCard title="Sessions" elements={sessions} />
    </div>
  )
}
export default DashboardPage