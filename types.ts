export interface SheetRow {
  title: string;
  type: string;
  url: string;
  status: string;
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
export type GeneratorStatus = 'idle' | 'verifying' | 'processing' | 'completed';
