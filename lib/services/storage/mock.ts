import { StorageService, UploadFileOptions } from "./types";

export class MockStorageService implements StorageService {
  private files = new Map<string, { contentType: string; buffer: Buffer | Uint8Array | Blob }>();

  async uploadFile({
    clientId,
    projectId,
    fileName,
    fileBuffer,
    contentType,
  }: UploadFileOptions): Promise<{ storagePath: string; originalFilename: string }> {
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `clients/${clientId}/projects/${projectId}/${sanitizedName}`;
    this.files.set(storagePath, { contentType, buffer: fileBuffer });
    return { storagePath, originalFilename: fileName };
  }

  async getSignedUrl(storagePath: string, expiresInSeconds = 3600): Promise<string> {
    // Return a mock signed URL that points to a placeholder or data URI
    return `https://mock-storage.ibd.internal/${storagePath}?token=mock_signed_token&expires=${expiresInSeconds}`;
  }

  async deleteFile(storagePath: string): Promise<void> {
    this.files.delete(storagePath);
  }
}
