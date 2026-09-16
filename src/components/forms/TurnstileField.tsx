"use client";

import { useEffect, useRef } from "react";

import { getTurnstileSiteKey, isTurnstileClientEnabled } from "@/lib/turnstileClient";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode?: string) => boolean | void;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          size?: "normal" | "compact";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";

interface TurnstileFieldProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
  resetKey: number;
}

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      if (window.turnstile) {
        resolve();
        return;
      }
      window.onTurnstileLoad = () => resolve();
      existing.addEventListener("error", () => reject(new Error("Turnstile script failed to load")), {
        once: true,
      });
      return;
    }

    window.onTurnstileLoad = () => resolve();

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(script);
  });
}

export function TurnstileField({ onVerify, onExpire, onError, resetKey }: TurnstileFieldProps) {
  const siteKey = getTurnstileSiteKey();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onVerify, onExpire, onError });

  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError };
  }, [onVerify, onExpire, onError]);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          appearance: "always",
          size: "normal",
          callback: (token) => callbacksRef.current.onVerify(token),
          "expired-callback": () => callbacksRef.current.onExpire(),
          "error-callback": () => {
            callbacksRef.current.onError();
            return true;
          },
        });
      })
      .catch(() => {
        callbacksRef.current.onError();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [resetKey, siteKey]);

  if (!isTurnstileClientEnabled()) return null;

  return (
    <div className="mt-5">
      <div ref={containerRef} className="min-h-[65px]" />
    </div>
  );
}
