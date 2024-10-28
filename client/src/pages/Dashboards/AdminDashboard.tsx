import { MaxWidthWrapper } from '@/components';
import RootLayout from '@/layouts/Layout';

function AdminDashboard() {
  console.log('ingresaste al AdminDashboard');

  return (
    <RootLayout>
      <MaxWidthWrapper>
        <div>AdminDashboard</div>
      </MaxWidthWrapper>
    </RootLayout>
  );
}
export default AdminDashboard;
