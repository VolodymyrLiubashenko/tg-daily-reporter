import { onMounted, onUnmounted, reactive, ref, toRefs, type Ref } from "vue";

export const BREAKPOINTS = {
   mobile: "(max-width: 767px)",
   tablet: "(min-width: 768px) and (max-width: 1024px)",
   laptop: "(min-width: 1024px) and (max-width: 1280px)",
   desktop: "(min-width: 1280px) and (max-width: 1440px)",
   wide: "(min-width: 1440px)",
} as const;

export type TBreakpointName = keyof typeof BREAKPOINTS;

type MediaQueryFlags = {
   isMobile: boolean;
   isTablet: boolean;
   isLaptop: boolean;
   isDesktop: boolean;
   isWide: boolean;
};

const BREAKPOINT_TO_FLAG: Record<TBreakpointName, keyof MediaQueryFlags> = {
   mobile: "isMobile",
   tablet: "isTablet",
   laptop: "isLaptop",
   desktop: "isDesktop",
   wide: "isWide",
};

const INITIAL_FLAGS: MediaQueryFlags = {
   isMobile: false,
   isTablet: false,
   isLaptop: false,
   isDesktop: false,
   isWide: false,
};

function isBreakpointName(query: string): query is TBreakpointName {
   return query in BREAKPOINTS;
}

/** Ключ `BREAKPOINTS` або повний рядок `matchMedia`. */
function resolveMediaQuery(query: TBreakpointName | string): string {
   return isBreakpointName(query) ? BREAKPOINTS[query] : query;
}

/**
 * Реактивний `matchMedia` для одного CSS media query.
 * `query` — ключ з {@link BREAKPOINTS} (напр. `"mobile"`) або готовий рядок.
 */
export function useMediaQuery(query: TBreakpointName | string): Ref<boolean> {
   const matches = ref(false);
   let mql: MediaQueryList | undefined;

   const sync = () => {
      if (mql) {
         matches.value = mql.matches;
      }
   };

   onMounted(() => {
      if (typeof window === "undefined") {
         return;
      }
      mql = window.matchMedia(resolveMediaQuery(query));
      sync();
      mql.addEventListener("change", sync);
   });

   onUnmounted(() => {
      if (!mql) {
         return;
      }
      mql.removeEventListener("change", sync);
      mql = undefined;
   });

   return matches;
}

/**
 * Усі брейкпоінти з {@link BREAKPOINTS}: один `onMounted`, п’ять слухачів `change`.
 * Повертає ті самі імена ref, що й раніше: `isMobile`, `isTablet`, …
 */
export function useMediaQueries() {
   const flags = reactive<MediaQueryFlags>({ ...INITIAL_FLAGS });
   let cleanup: (() => void) | undefined;

   onMounted(() => {
      if (typeof window === "undefined") {
         return;
      }

      const disposers: (() => void)[] = [];

      for (const name of Object.keys(BREAKPOINTS) as TBreakpointName[]) {
         const mql = window.matchMedia(BREAKPOINTS[name]);
         const flagKey = BREAKPOINT_TO_FLAG[name];

         const onChange = () => {
            flags[flagKey] = mql.matches;
         };

         onChange();
         mql.addEventListener("change", onChange);
         disposers.push(() => {
            mql.removeEventListener("change", onChange);
         });
      }

      cleanup = () => {
         disposers.forEach((dispose) => {
            dispose();
         });
      };
   });

   onUnmounted(() => {
      cleanup?.();
      cleanup = undefined;
   });

   return toRefs(flags);
}
