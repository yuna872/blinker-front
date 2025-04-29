import router from './layouts/router';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '@styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <DialogProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position='top-center'
          theme='dark'
          hideProgressBar={true}
          autoClose={3000}
        />
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
