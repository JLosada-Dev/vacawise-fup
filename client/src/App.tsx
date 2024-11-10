import { Toaster } from './components/ui/toaster';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter />
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
