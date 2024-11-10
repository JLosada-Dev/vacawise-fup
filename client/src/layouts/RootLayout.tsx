import { Navigation, Footer } from '@/components/index';
import '@/index.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />

      <main className='flex grainy-light flex-col min-h-screen'>
        <div className='flex-1 flex flex-col h-full'>{children}</div>
        <Footer />
      </main>

      {/* <Toaster /> */}
    </>
  );
}
