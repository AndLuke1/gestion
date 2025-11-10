import { PropsWithChildren } from 'react';
import { ThemeProvider } from './lib/theme/ThemeProvider';
import { DataServiceProvider } from './lib/data/DataServiceProvider';

export default function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <DataServiceProvider>{children}</DataServiceProvider>
    </ThemeProvider>
  );
}
