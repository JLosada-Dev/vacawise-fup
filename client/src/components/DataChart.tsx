'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { helix } from 'ldrs';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.locale('es'); // Establecer el idioma de dayjs
helix.register();

const chartConfig = {
  milk: {
    label: 'Total de leche',
    color: '#16a34a',
  },
} satisfies ChartConfig;

function DataChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        setLoading(false); // Carga exitosa
      } catch (error) {
        setLoading(false);
        setError('Error al cargar los datos');
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, [URL_GRAFICA]);

  return (
    <>
      {error ? (
        <p className='text-red-500'>Hubo un problema: {error}</p>
      ) : loading ? (
        <span className='flex justify-center items-center'>
          <l-helix />
        </span>
      ) : (
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) => dayjs(tick).format('ddd DD')}
            />
            <YAxis tickFormatter={(value) => `${value} ml`} />
            <Tooltip formatter={(value) => `${value} ml`} />
            <Bar dataKey='totalMilk' fill={chartConfig.milk.color} radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
}

export default DataChart;
