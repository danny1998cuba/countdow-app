import { RouterProvider } from 'react-router-dom'
import { router } from './router/routes';
import { AuthProvider } from './context';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
