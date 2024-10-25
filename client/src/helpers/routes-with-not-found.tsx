import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
export default RoutesWithNotFound;
