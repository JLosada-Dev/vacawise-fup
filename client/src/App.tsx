import { UserProvider } from './contexts/UserContext';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </>
  );
}

export default App;
