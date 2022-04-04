/* eslint-disable */
//import './helpers/__global';

const run = async (): Promise<void> => {
  await import('./helpers/__global');
  // dynamic imports for code splitting
  const { lazy, Suspense, StrictMode } = await import('react');
  const ReactDOM = await import('react-dom');

  const App = lazy(() => import('./App'));

  ReactDOM.render(
    <StrictMode>
      <Suspense fallback={<div />}>
        <App />
      </Suspense>
    </StrictMode>,
    document.getElementById('root')
  );
};

void run();

export {};
