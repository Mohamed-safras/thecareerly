// lib/rate-limit/debounce.ts
export function debounce(func: (value: string) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (value: string): void => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(value);
    }, delay);
  };
}
