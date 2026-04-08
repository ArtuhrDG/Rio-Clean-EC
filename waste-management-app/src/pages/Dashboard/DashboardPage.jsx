import KpiCards     from "../../components/dashboard/KpiCards";
import MapaCalor    from "../../components/dashboard/MapaCalor";
import AlertasPanel from "../../components/dashboard/AlertasPanel";
import BarChart     from "../../components/dashboard/BarChart";
import DonutChart   from "../../components/dashboard/DonutChart";

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <KpiCards />
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: 12 }}>
        <MapaCalor />
        <AlertasPanel />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
        <BarChart />
        <DonutChart />
      </div>
    </div>
  )
}