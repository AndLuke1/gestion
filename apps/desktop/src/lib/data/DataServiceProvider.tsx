import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { IDataService } from './DataService';
import { createMockDataService } from './mockData';

const DataServiceContext = createContext<IDataService | null>(null);

export function DataServiceProvider({ children }: PropsWithChildren) {
  const service = useMemo(() => createMockDataService(), []);

  return <DataServiceContext.Provider value={service}>{children}</DataServiceContext.Provider>;
}

export function useDataService(): IDataService {
  const ctx = useContext(DataServiceContext);
  if (!ctx) throw new Error('useDataService debe usarse dentro de DataServiceProvider');
  return ctx;
}
