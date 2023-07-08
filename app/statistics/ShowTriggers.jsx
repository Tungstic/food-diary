'use client';

import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import BarChart from '../components/BarChart';

Chart.register(CategoryScale);

// button -> show triggers on click
export default function ShowTriggers(props) {
  const symptom = props.symptom;

  const [chartData, setChartData] = useState({});
  const [hidden, setHidden] = useState(true);

  async function handleClick() {
    const response = await fetch(`/api/symptoms/${symptom}`);

    const data = await response.json();

    console.log('data', data.ingredients);
    // Object: {ingredients: [{ingredientName, ingredientCount}]}

    setChartData({
      labels: data.ingredients.map((i) => i.ingredientName),
      datasets: [
        {
          label: 'logged',
          data: data.ingredients.map((i) => i.ingredientCount),
          backgroundColor: ['rgba(107, 63, 160, 0.5)'],
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    });
    setHidden(false);
  }

  return (
    <div>
      <button
        onClick={async () => {
          await handleClick();
          setHidden(!hidden);
        }}
      >
        {hidden ? 'show possible food triggers' : 'close chart'}
      </button>

      {Object.keys(chartData).includes('labels') && !hidden && (
        <BarChart chartData={chartData} />
      )}
    </div>
  );
}
