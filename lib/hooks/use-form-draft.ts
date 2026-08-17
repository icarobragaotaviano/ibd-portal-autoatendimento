"use client";

import { useEffect, useState, useCallback } from "react";

export interface FormDraftOptions<T> {
  key: string;
  initialValues: T;
}

export function useFormDraft<T extends Record<string, any>>({
  key,
  initialValues,
}: FormDraftOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const storageKey = `ibd_draft_${key}`;

  // Check for saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data && Object.keys(parsed.data).length > 0) {
          setHasSavedDraft(true);
          if (parsed.savedAt) {
            const date = new Date(parsed.savedAt);
            setDraftSavedAt(
              date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
            );
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [storageKey]);

  // Save values whenever they change (debounced via state update)
  const saveDraft = useCallback(
    (newValues: Partial<T>) => {
      setValues((prev) => {
        const updated = { ...prev, ...newValues };
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              data: updated,
              savedAt: new Date().toISOString(),
            })
          );
          setHasSavedDraft(true);
        } catch {
          // Ignore
        }
        return updated;
      });
    },
    [storageKey]
  );

  // Restore saved draft
  const restoreDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data) {
          setValues(parsed.data);
          setHasSavedDraft(false);
          return parsed.data;
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
