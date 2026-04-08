// src/components/dashboard/BarChart.jsx
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

const datos = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  datasets: [{
    label: 'Toneladas',
    data: [4.2, 5.8, 3.9, 6.1, 5.5, 4.8, 3.2],
    backgroundColor: ['#E24B4A','#EF9F27','#639922','#E24B4A','#EF9F27','#378ADD','#639922'],
    borderRadius: 5,
  }]
}

export default function BarChart() {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: '12px 14px' }}>
      <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 12 }}>
        Recolección semanal <span style={{ fontSize: 11, color: '#888', fontWeight: 400 }}>Toneladas por día</span>
      </div>
      <div style={{ height: 180 }}>
        <Bar data={datos} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}/>
      </div>
    </div>
  )
}