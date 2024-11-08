import RootLayout from '@/layouts/Layout';
import { MaxWidthWrapper, Component } from '@/components';

function Dashboard() {
  return (
    <>
      <RootLayout>
        <MaxWidthWrapper>
          <div>AdminDashboard</div>
          <Component />
        </MaxWidthWrapper>
      </RootLayout>
    </>
  );
}
export default Dashboard;
