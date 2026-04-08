// src/components/dashboard/DonutChart.jsx
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const datos = {
  labels: ['Vacío', 'Medio', 'Lleno', 'Desbordado'],
  datasets: [{
    data: [28, 42, 22, 8],
    backgroundColor: ['#C0DD97', '#EF9F27', '#E24B4A', '#A32D2D'],
    borderWidth: 0,
  }]
}

export default function DonutChart() {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, padding: '12px 14px' }}>
      <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 8 }}>
        Nivel contenedores <span style={{ fontSize: 11, color: '#888', fontWeight: 400 }}>Por zona</span>
      </div>
      <div style={{ height: 180 }}>
        <Doughnut data={datos} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 10, padding: 10 } } } }}/>
      </div>
    </div>
  )
}