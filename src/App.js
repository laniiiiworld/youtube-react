import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { DarkModeProvider } from './context/DarkModeContext';
import { YoutubeApiProvider } from './context/YoutubeApiProvider';

const queryClient = new QueryClient();

export default function App() {
  return (
    <DarkModeProvider>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </DarkModeProvider>
  );
}
