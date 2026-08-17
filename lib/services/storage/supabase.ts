import { StorageService, UploadFileOptions } from "./types";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export class SupabaseStorageService implements StorageService {
  private bucketName = "project-materials";

  private get client() {
    return getSupabaseAdminClient();
  }

  async uploadFile({
    clientId,
    projectId,
    fileName,
    fileBuffer,
    contentType,
  }: UploadFileOptions): Promise<{ storagePath: string; originalFilename: string }> {
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `clients/${clientId}/projects/${projectId}/${Date.now()}_${sanitizedName}`;

    const { error } = await this.client.storage
      .from(this.bucketName)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: false,
      });

    if (error) throw error;
    return { storagePath, originalFilename: fileName };
  }

  async getSignedUrl(storagePath: string, expiresInSeconds = 3600): Promise<string> {
    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .createSignedUrl(storagePath, expiresInSeconds);

    if (error) throw error;
    return data.signedUrl;
  }

  async deleteFile(storagePath: string): Promise<void> {
    const { error } = await this.client.storage
      .from(this.bucketName)
      .remove([storagePath]);

    if (error) throw error;
  }
}
