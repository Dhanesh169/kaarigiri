"use client";

import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PWARegister() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [appleMobile, setAppleMobile] = useState(false);
  const [showAppleHelp, setShowAppleHelp] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(isStandalone);
    setAppleMobile(
      /iphone|ipad|ipod/i.test(navigator.userAgent)
      || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );

    if ("serviceWorker" in navigator) {
      const register = () => navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Kaarigiri offline support could not be registered:", error);
      });
      if (document.readyState === "complete") register();
      else window.addEventListener("load", register, { once: true });
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowAppleHelp(false);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstallPrompt(null);
  }

  if (installed) return <span className="pwa-installed" aria-live="polite">App installed</span>;

  if (appleMobile) {
    return (
      <div className="pwa-help-wrap">
        <button className="pwa-install" onClick={() => setShowAppleHelp((value) => !value)} aria-expanded={showAppleHelp}>
          <Share size={14} /> Add to Home Screen
        </button>
        {showAppleHelp && (
          <div className="pwa-help" role="status">
            In Safari, tap the Share icon, then choose <b>Add to Home Screen</b> and confirm.
          </div>
        )}
      </div>
    );
  }

  if (!installPrompt) return null;
  return <button className="pwa-install" onClick={install}><Download size={14} /> Install app</button>;
}
