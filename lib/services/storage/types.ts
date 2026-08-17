export interface UploadFileOptions {
  clientId: string;
  projectId: string;
  fileName: string;
  fileBuffer: Buffer | Uint8Array | Blob;
  contentType: string;
}

export interface StorageService {
  uploadFile(options: UploadFileOptions): Promise<{ storagePath: string; originalFilename: string }>;
  getSignedUrl(storagePath: string, expiresInSeconds?: number): Promise<string>;
  deleteFile(storagePath: string): Promise<void>;
}
