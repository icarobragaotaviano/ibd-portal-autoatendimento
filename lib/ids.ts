import { randomUUID } from "node:crypto";

export function createProtocol(prefix = "IBD") {
  const compact = randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `${prefix}-${compact}`;
}

export function createLeadProtocol(prefix = "IBD", year = "2026") {
  const compact = randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `${prefix}-${year}-${compact}`;
}

