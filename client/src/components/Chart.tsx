'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  milk: {
    label: 'Milk',
    color: '#38a169',
  },
} satisfies ChartConfig;

function Component() {
  const [chartData, setChartData] = useState([]);
  const URL_GRAFICA = import.meta.env.VITE_URL_GRAFICAS;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_GRAFICA);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Gráfica</h1>
      <ChartContainer config={chartConfig} className='min-h-[200px] max-w-2xl'>
        <BarChart accessibilityLayer data={chartData} width={500} height={300}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='totalMilk' fill={chartConfig.milk.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}

export default Component;
