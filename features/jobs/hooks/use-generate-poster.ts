"use client";

import { useMemo, useState } from "react";
import { axiosClient } from "@/lib/axios/axios-client";
import type { JobForm, PosterPayload } from "@/interfaces/job";
import { normalizePosterVibe } from "@/types/poster";
import axios from "axios";
import { extractStatusAndMessage } from "@/lib/error/error-message-extractor";
import { GENERATE_POSTER } from "@/constents/router-links";

interface GeneratePosterResponse {
  type: "poster";
  image: string; // single output
  meta: { prompt: string; size: string; mode: "generate" | "edit_compose" };
}

const MAX_FILES = 3;

export function useGeneratePoster({
  title,
  posterNotes,
  posterVibe,

  brandColorHex,
}: JobForm) {
  const [busyPoster, setBusyPoster] = useState(false);
  const [posterImg, setPosterImg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sampleImages, setSampleImages] = useState<File[]>([]);

  const AIInputs: PosterPayload = useMemo(
    () => ({
      title,
      posterNotes,
      posterVibe,
      brandColorHex,
    }),
    [title, posterNotes, posterVibe, brandColorHex]
  );

  async function generatePoster() {
    // Fix: Properly validate posterNotes before making the API call
    const cleanPosterNotes = (AIInputs.posterNotes || "").trim();

    if (!cleanPosterNotes) {
      setError("Write your poster notes...");
      return;
    }

    setBusyPoster(true);
    setPosterImg("");
    setError("");

    try {
      const vibe = normalizePosterVibe(AIInputs.posterVibe);

      if (sampleImages.length > 0) {
        const formData = new FormData();

        // Always append required fields as strings
        formData.append("posterNotes", cleanPosterNotes.slice(0, 220));
        formData.append("title", (AIInputs.title || "").trim());
        formData.append("posterVibe", vibe);

        // Only append optional fields if they have values
        const cleanCompanyName = (AIInputs.companyName || "").trim();
        if (cleanCompanyName) {
          formData.append("companyName", cleanCompanyName);
        }

        const cleanBrandColor = (AIInputs.brandColorHex || "").trim();
        if (cleanBrandColor) {
          formData.append("brandColorHex", cleanBrandColor);
        }

        // Append valid image files only with strict validation
        const validImages = sampleImages.slice(0, MAX_FILES).filter((file) => {
          if (!(file instanceof File) || file.size === 0) {
            console.warn("Skipping invalid file:", file);
            return false;
          }

          // Check MIME type
          const supportedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ];
          if (!supportedTypes.includes(file.type.toLowerCase())) {
            // If MIME type is missing, check file extension
            const ext = file.name?.split(".").pop()?.toLowerCase();
            const supportedExts = ["jpg", "jpeg", "png", "webp"];
            if (!ext || !supportedExts.includes(ext)) {
              console.warn(
                "Skipping unsupported file type:",
                file.type,
                file.name
              );
              return false;
            }
          }

          // Check file size (max 10MB)
          if (file.size > 10 * 1024 * 1024) {
            console.warn("Skipping oversized file:", file.size, file.name);
            return false;
          }

          return true;
        });

        if (validImages.length === 0) {
          setError(
            "No valid image files selected. Please use JPEG, PNG, or WebP images."
          );
          return;
        }

        validImages.forEach((file) => {
          formData.append("sampleImages", file, file.name || "image.png");
        });

        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(
              `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
            );
          } else {
            console.log(`${key}: "${value}"`);
          }
        }

        const { data } = await axiosClient.post<GeneratePosterResponse>(
          GENERATE_POSTER,
          formData,
          {
            headers: {
              // Let the browser set Content-Type with boundary for multipart
              "Content-Type": undefined,
            },
          }
        );
        setPosterImg(data.image);
      } else {
        // Fix: Ensure all fields are properly handled
        const payload: PosterPayload = {
          title: (AIInputs.title || "").trim(),
          posterNotes: cleanPosterNotes.slice(0, 220),
          companyName: AIInputs.companyName?.trim() || undefined,
          brandColorHex: AIInputs.brandColorHex?.trim() || undefined,
          posterVibe: vibe,
        };

        const { data } = await axiosClient.post<GeneratePosterResponse>(
          GENERATE_POSTER,
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
      } else if (status && status >= 400 && status < 500) {
        const msg = message || "Request failed.";
        setError(msg);
      } else {
        const msg = "Poster generation failed";
        setError(msg);
      }
    } finally {
      setBusyPoster(false);
    }
  }

  return {
    busyPoster,
    posterImg,
    error,
    sampleImages,
    setSampleImages,
    generatePoster,
    clearPoster: () => setPosterImg(""),
    clearError: () => setError(""),
  };
}
