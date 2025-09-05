// hooks/useGeneratePoster.ts
"use client";

import { useMemo, useState } from "react";
import { axiosClient } from "@/lib/axios/axios-client";
import type { JobForm } from "@/types/job";
import { normalizePosterVibe, PosterPayload } from "@/types/poster-types";
import axios from "axios";
import { extractStatusAndMessage } from "@/lib/error/error-message-extractor";
import { toast } from "sonner";

interface GeneratePosterResponse {
  type: "poster";
  image: string;
  meta: { prompt: string; size: string; mode?: "generate" | "edit" };
}

export function useGeneratePoster({
  title,
  posterNotes,
  posterVibe,
  companyName,
  brandColorHex,
}: JobForm) {
  const [busyPoster, setBusyPoster] = useState(false);
  const [posterImg, setPosterImg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sampleImage, setSampleImage] = useState<File | null>(null);

  const AIInputs: PosterPayload = useMemo(
    () => ({
      title,
      posterNotes,
      posterVibe,
      brandColorHex,
      companyName,
    }),
    [title, posterNotes, posterVibe, brandColorHex, companyName]
  );

  async function generatePoster() {
    if (!AIInputs.posterNotes) {
      setError("Write your poster notes...");
      return;
    }

    setBusyPoster(true);
    setPosterImg("");
    setError("");

    try {
      const vibe = normalizePosterVibe(AIInputs.posterVibe);

      if (sampleImage) {
        // multipart form-data (with image)
        const formData = new FormData();
        formData.append("posterNotes", AIInputs.posterNotes.slice(0, 220));
        formData.append("title", AIInputs.title ?? "");
        if (AIInputs.companyName)
          formData.append("companyName", AIInputs.companyName);
        if (AIInputs.brandColorHex)
          formData.append("brandColorHex", AIInputs.brandColorHex);
        formData.append("posterVibe", vibe);
        formData.append("sampleImage", sampleImage, sampleImage.name);

        const { data } = await axiosClient.post<GeneratePosterResponse>(
          "/generate-poster",
          formData
        );
        setPosterImg(data.image);
      } else {
        // JSON payload (without image)
        const payload: PosterPayload = {
          title: AIInputs.title ?? "",
          posterNotes: AIInputs.posterNotes.slice(0, 220),
          companyName: AIInputs.companyName ?? undefined,
          brandColorHex: AIInputs.brandColorHex ?? undefined,
          posterVibe: vibe,
        };

        const { data } = await axiosClient.post<GeneratePosterResponse>(
          "/generate-poster",
          { payload }
        );
        setPosterImg(data.image);
      }
    } catch (err: unknown) {
      const { status, message } = extractStatusAndMessage(err);

      if (status === 429) {
        const retryAfter = axios.isAxiosError(err)
          ? Number(err.response?.headers?.["retry-after"])
          : NaN;
        const msg =
          Number.isFinite(retryAfter) && retryAfter > 0
            ? `Rate limit hit. Try again in ~${retryAfter} seconds.`
            : "Rate limit hit. Please wait a bit and retry.";
        setError(msg);
        toast.error(msg);
      } else if (status && status >= 400 && status < 500) {
        const msg = message || "Request failed.";
        setError(msg);
      } else {
        const msg = "Poster generation failed";
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setBusyPoster(false);
    }
  }

  return {
    busyPoster,
    posterImg,
    error,
    sampleImage,
    setSampleImage,
    generatePoster,
    clearPoster: () => setPosterImg(""),
    clearError: () => setError(""),
  };
}
