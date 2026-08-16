import { randomUUID } from "node:crypto";

export function createProtocol(prefix = "IBD") {
  const compact = randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `${prefix}-${compact}`;
}
