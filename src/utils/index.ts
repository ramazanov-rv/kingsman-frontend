export const isWebApp =
  typeof Telegram !== "undefined" &&
  Telegram.WebApp &&
  Boolean(Telegram.WebApp.initData);
export const isMobileWebApp =
  isWebApp &&
  Telegram.WebApp.platform !== "tdesktop" &&
  Telegram.WebApp.platform !== "weba" &&
  Telegram.WebApp.platform !== "macos" &&
  Telegram.WebApp.platform !== "webk" &&
  !Telegram.WebApp.platform.startsWith("web");

export function telegramVibrate(
  type: "light" | "medium" | "heavy" | "soft" | "rigid"
) {
  if (isWebApp) {
    Telegram.WebApp.HapticFeedback.impactOccurred(type);
  }
}
