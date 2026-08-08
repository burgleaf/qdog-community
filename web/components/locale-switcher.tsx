"use client";

import { usePathname, useRouter } from "next/navigation";

import { ActionDropdown } from "@/components/action-dropdown";
import { useLocale } from "@/components/locale-provider";
import {
  type Locale,
  localeConfig,
  localeFromPathname,
  localePath,
  supportedLocales,
} from "@/lib/i18n";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    const routeLocale = localeFromPathname(pathname);
    const basePath = routeLocale
      ? pathname.replace(new RegExp(`^/${routeLocale}(?=/|$)`), "") || "/"
      : pathname;
    if (
      basePath === "/" ||
      basePath === "/install" ||
      basePath === "/request"
    ) {
      router.push(localePath(nextLocale, basePath));
    }
  }

  return (
    <ActionDropdown
      label="Language"
      menuWidth={180}
      triggerClassName="inline-flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-full border border-border bg-bg-secondary px-2 text-xs font-bold text-text transition-colors hover:border-accent hover:text-accent sm:w-auto sm:min-w-[7.75rem] sm:justify-between sm:px-3.5"
      trigger={
        <>
          <span className="hidden whitespace-nowrap sm:block">{localeConfig[locale].label}</span>
          <svg className="size-4 shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
          </svg>
          <svg
            aria-hidden="true"
            className="size-3 shrink-0 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="m7 10 5 5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      }
    >
      <div className="p-1" role="none">
        {supportedLocales.map((item) => {
          const selected = item === locale;
          return (
            <button
              aria-checked={selected}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selected
                  ? "bg-surface text-text"
                  : "text-muted hover:bg-surface hover:text-text"
              }`}
              key={item}
              onClick={() => changeLocale(item)}
              role="menuitemradio"
              type="button"
            >
              <span>{localeConfig[item].label}</span>
              {selected ? (
                <svg
                  aria-hidden="true"
                  className="size-4 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.25}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m5 12 4 4L19 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </button>
          );
        })}
      </div>
    </ActionDropdown>
  );
}
