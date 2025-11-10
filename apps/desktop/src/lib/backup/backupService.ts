// backupService.ts
// -----------------------------------------------------------------------------
// Placeholder implementation for automated and on-demand backups. The real
// logic will zip the SQLite database together with the attachments directory
// stored under %APPDATA%/GestionVida.

export interface BackupSummary {
  createdAt: string;
  path: string;
  sizeBytes: number;
}

export interface BackupOptions {
  dataRoot: string;
  retainCount?: number;
}

export interface RestoreOptions {
  backupPath: string;
  dataRoot: string;
}

export class BackupService {
  constructor(private readonly options: BackupOptions) {}

  async ensureDailyBackup(): Promise<BackupSummary | null> {
    // TODO: check last backup timestamp and create a new archive if needed.
    return null;
  }

  async backupNow(): Promise<BackupSummary> {
    // TODO: zip the data directory and return metadata.
    return {
      createdAt: new Date().toISOString(),
      path: '',
      sizeBytes: 0,
    };
  }

  async listBackups(): Promise<BackupSummary[]> {
    // TODO: read backup directory contents.
    return [];
  }

  async restoreBackup(_options: RestoreOptions): Promise<void> {
    // TODO: unpack the zip archive and replace the data directory.
  }
}
