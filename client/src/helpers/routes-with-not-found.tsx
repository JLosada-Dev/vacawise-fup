import Page404 from '@/pages/page404';
import { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}
export default RoutesWithNotFound;
