'use client';

import { Bar, BarChart } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import RootLayout from '@/layouts/Layout';
import { MaxWidthWrapper } from '@/components';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 80 },
  { month: 'March', desktop: 237, mobile: 80 },
  { month: 'April', desktop: 73, mobile: 80 },
  { month: 'May', desktop: 209, mobile: 80 },
  { month: 'June', desktop: 214, mobile: 80 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'YELLOW',
  },
  mobile: {
    label: 'Mobile',
    color: '#aa44dd',
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <RootLayout>
      <MaxWidthWrapper>
        <h1>Esta pagina es de Gestion de Reportes</h1>
        <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
            <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
          </BarChart>
        </ChartContainer>
      </MaxWidthWrapper>
    </RootLayout>
  );
}
