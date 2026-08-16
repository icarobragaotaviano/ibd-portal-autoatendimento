import type { ClientRequestInput, ClientRequestRecord } from "@/lib/types";

export interface RequestRepository {
  create(input: ClientRequestInput): Promise<ClientRequestRecord>;
  findByProtocolAndEmail(id: string, email: string): Promise<ClientRequestRecord | null>;
  listAll(): Promise<ClientRequestRecord[]>;
  update(
    id: string,
    updates: Partial<Pick<ClientRequestRecord, "status" | "confirmedDueDate" | "revisionsUsed">>,
  ): Promise<ClientRequestRecord>;
}
