import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/database";
import { storage } from "@/lib/services/storage";
import { getCurrentClient } from "@/lib/auth/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let client = await getCurrentClient();
    if (!client) client = await db.getClient("CLI-DEMO01");

    if (!client || !client.portal_enabled) {
      return NextResponse.json({ success: false, error: "Não autorizado." }, { status: 401 });
    }

    const project = await db.getProject(id);
    if (!project || project.client_id !== client.id) {
      return NextResponse.json({ success: false, error: "Projeto não encontrado." }, { status: 404 });
    }

    const body = await req.json();
    const { material_id, name, filename, mime_type, file_size } = body;

    // Simulate storage upload or register metadata
    const { storagePath } = await storage.uploadFile({
      clientId: client.id,
      projectId: project.id,
      fileName: filename || "arquivo_enviado.pdf",
      fileBuffer: Buffer.from("simulated_content"),
      contentType: mime_type || "application/octet-stream",
    });

    let material;
    if (material_id) {
      material = await db.updateMaterialStatus(material_id, "recebido");
    } else {
      material = await db.createProjectMaterial({
        project_id: project.id,
        name: name || filename || "Material Adicional",
        required: true,
        storage_path: storagePath,
        original_filename: filename || "arquivo.pdf",
        mime_type: mime_type || "application/pdf",
        file_size: file_size || 1024,
        uploaded_by: client.name,
        uploaded_at: new Date().toISOString(),
      });
      await db.updateMaterialStatus(material.id, "recebido");
    }

    await db.createActivityLog({
      actor_type: "client",
      actor_id: client.id,
      entity_type: "project",
      entity_id: project.id,
      event: "material.uploaded",
      metadata: { material_name: material.name, filename },
    });

    return NextResponse.json({ success: true, material });
  } catch (error) {
    console.error("Error uploading material:", error);
    return NextResponse.json({ success: false, error: "Falha ao enviar material." }, { status: 500 });
  }
}
