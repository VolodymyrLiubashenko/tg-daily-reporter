import { computed, onMounted, onUnmounted, ref } from "vue";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "tg-daily-reporter-theme";
const theme = ref<ThemeMode>("light");

let mediaQuery: MediaQueryList | null = null;
let activeSubscribers = 0;

function isThemeMode(value: string | null): value is ThemeMode {
   return value === "light" || value === "dark";
}

function getStoredTheme() {
   const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

   return isThemeMode(storedTheme) ? storedTheme : null;
}

function getSystemTheme(): ThemeMode {
   return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(nextTheme: ThemeMode) {
   theme.value = nextTheme;
   document.documentElement.dataset.theme = nextTheme;
}

function syncTheme() {
   applyTheme(getStoredTheme() ?? getSystemTheme());
}

function handleSystemThemeChange() {
   if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
   }
}

export function useTheme() {
   onMounted(() => {
      activeSubscribers += 1;
      syncTheme();

      if (!mediaQuery) {
         mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
         mediaQuery.addEventListener("change", handleSystemThemeChange);
      }
   });

   onUnmounted(() => {
      activeSubscribers -= 1;

      if (activeSubscribers <= 0) {
         mediaQuery?.removeEventListener("change", handleSystemThemeChange);
         mediaQuery = null;
         activeSubscribers = 0;
      }
   });

   const isDarkTheme = computed(() => theme.value === "dark");

   const setTheme = (nextTheme: ThemeMode) => {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
   };

   const toggleTheme = () => {
      setTheme(isDarkTheme.value ? "light" : "dark");
   };

   return {
      isDarkTheme,
      theme,
      setTheme,
      toggleTheme,
   };
}
