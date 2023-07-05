import { Bar } from 'react-chartjs-2';

export default function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Possible food triggers',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
