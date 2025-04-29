import ReactDOM from 'react-dom/client'; // createRoot 메서드를 가져오기
import { theme } from './styles/theme';
import { QueryClient } from '@tanstack/react-query';
import { store } from 'store/store';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')); // ReactDOM.createRoot 사용
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);
