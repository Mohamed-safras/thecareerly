/**
 * Blocking script to prevent FOUC (Flash of Unstyled Content)
 * This must run BEFORE first paint to apply theme and palette classes
 */
export function ThemeScript() {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const activeTheme = theme === 'system' || !theme ? systemTheme : theme;
      
      if (activeTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
        
      const palette = localStorage.getItem('app-palette') || 'black-white-palette';
      document.documentElement.classList.add(palette);
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      // Suppress hydration warning since this is intentionally different
      suppressHydrationWarning
    />
  );
}
