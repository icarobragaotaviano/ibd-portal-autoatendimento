"use client";

import { useEffect, useState, useCallback } from "react";

export interface FormDraftOptions<T> {
  key: string;
  initialValues: T;
  version?: number;
  expiryDays?: number;
  contextId?: string | null;
}

export interface DraftStorageEnvelope<T> {
  version: number;
  savedAt: string;
  contextId?: string | null;
  data: T;
}

export function useFormDraft<T extends Record<string, any>>({
  key,
  initialValues,
  version = 1,
  expiryDays = 7,
  contextId = null,
}: FormDraftOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const storageKey = `ibd_draft_v${version}_${key}${contextId ? `_${contextId}` : ""}`;

  // Check for saved draft on mount with version and expiration checks
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;

      const envelope: DraftStorageEnvelope<T> = JSON.parse(raw);

      // Validate envelope structure and version
      if (!envelope || envelope.version !== version || !envelope.data) {
        localStorage.removeItem(storageKey);
        return;
      }

      // ContextId check (e.g., matching prospect or project)
      if (contextId && envelope.contextId !== contextId) {
        return;
      }

      // Expiration check
      if (envelope.savedAt) {
        const savedTime = new Date(envelope.savedAt).getTime();
        const now = Date.now();
        const maxAgeMs = expiryDays * 24 * 60 * 60 * 1000;

        if (now - savedTime > maxAgeMs) {
          localStorage.removeItem(storageKey);
          return;
        }

        // Check if there is actual non-empty content
        const hasContent = Object.values(envelope.data).some(
          (val) => val !== "" && val !== null && val !== undefined && val !== false
        );

        if (hasContent) {
          setHasSavedDraft(true);
          const date = new Date(envelope.savedAt);
          setDraftSavedAt(
            date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          );
        }
      }
    } catch {
      // Ignore localStorage errors safely
    }
  }, [storageKey, version, expiryDays, contextId]);

  // Save values whenever they change
  const saveDraft = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => {
        const updated = { ...prev, ...newValues };
        try {
          const envelope: DraftStorageEnvelope<T> = {
            version,
            savedAt: new Date().toISOString(),
            contextId,
            data: updated,
          };
          localStorage.setItem(storageKey, JSON.stringify(envelope));
          setHasSavedDraft(true);
        } catch {
          // Ignore safely
        }
        return updated;
      });
    },
    [storageKey, version, contextId]
  );

  // Restore saved draft
  const restoreDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const envelope: DraftStorageEnvelope<T> = JSON.parse(raw);
        if (envelope?.data) {
          setValues(envelope.data);
          setHasSavedDraft(false);
          return envelope.data;
        }
      }
    } catch {
      // Ignore
    }
    return null;
  }, [storageKey]);

  // Clear saved draft
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setHasSavedDraft(false);
      setDraftSavedAt(null);
    } catch {
      // Ignore
    }
  }, [storageKey]);

  return {
    values,
    setValues,
    saveDraft,
    hasSavedDraft,
    draftSavedAt,
    restoreDraft,
    clearDraft,
  };
}
