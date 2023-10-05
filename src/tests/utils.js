import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { DarkModeContext } from '../context/DarkModeContext';
import { YoutubeApiContext } from '../context/YoutubeApiContext';

export function withRouter(routes, initialEntry = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withAllContexts(children, youtube = {}, darkMode = false) {
  const testClient = createTestQueryClient();
  return (
    <>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode: () => {} }}>
        <YoutubeApiContext.Provider value={{ youtube }}>
          <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
        </YoutubeApiContext.Provider>
      </DarkModeContext.Provider>
    </>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
