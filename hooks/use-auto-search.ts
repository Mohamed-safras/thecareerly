// hooks/use-auto-search.ts
import { useEffect, useRef, useState } from "react";
import { AxiosError, AxiosInstance } from "axios";
import { isAxiosCanceled } from "@/lib/axios/is-axios-canceled";

export type AutoSearchOptions<T> = {
  client: AxiosInstance;
  path: string;
  query?: string;
  buildParams?: (q: string) => Record<string, string | number | boolean>;
  mapper: (raw: unknown) => T[]; // caller supplies a safe mapper
  minChars?: number; // default 2
  debounceMs?: number; // default 250
  enabled?: boolean; // default true
};

export type AutoSearchState<T> = {
  loading: boolean;
  results: T[];
  error: string | null; // non-cancel errors only
};

// keep latest fn/value without re-triggering effect
function useLatestRef<V>(v: V) {
  const r = useRef<V>(v);
  r.current = v;
  return r;
}

export function useAutoSearch<T>({
  client,
  path,
  query,
  buildParams,
  mapper,
  minChars = 2,
  debounceMs = 250,
  enabled = true,
}: AutoSearchOptions<T>): AutoSearchState<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  const buildParamsRef = useLatestRef(buildParams);
  const mapperRef = useLatestRef(mapper);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    if (!query || query.trim().length < minChars) {
      setResults([]);
      setError(null);
      return;
    }

    const ctrl = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = buildParamsRef.current
          ? buildParamsRef.current(query)
          : { query };

        const { data } = await client.get<unknown>(path, {
          params,
          signal: ctrl.signal,
        });

        // map safely (no state updates if canceled; axios would throw above)
        const mapped = mapperRef.current(data);
        setResults(mapped);
      } catch (err) {
        if (isAxiosCanceled(err)) {
          // swallow silently: user typed again / component unmounted
        } else {
          const msg =
            err instanceof AxiosError
              ? err.message || "Request failed"
              : "Request failed";
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      ctrl.abort(); // triggers CanceledError (ignored)
      clearTimeout(timer);
    };
    // DO NOT include buildParams/mapper (their refs keep latest versions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, path, query, minChars, debounceMs, enabled]);

  return { loading, results, error };
}
