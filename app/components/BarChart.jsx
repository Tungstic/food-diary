import { Bar } from 'react-chartjs-2';

export default function BarChart({ chartData }) {
  return (
    <div style={{ width: '600px' }}>
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
