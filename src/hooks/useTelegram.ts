const tg = Telegram.WebApp;

export const useTelegram = () => {
  const user = tg.initDataUnsafe.user;
  const themeParams = tg.themeParams;
  const platform = tg.platform;

  return {
    tg,
    user,
    themeParams,
    platform,
  };
};
