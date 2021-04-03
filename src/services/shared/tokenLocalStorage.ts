import { hash } from "./hash";

export const getAccessToken = () => {
  if (typeof window !== "undefined")
    return (window as any).localStorage.getItem(`accessToken:${hash()}`);
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined")
    return (window as any).localStorage.getItem(`refreshToken:${hash()}`);
};

export const setAccessToken = (accessToken: string) => {
  if (typeof window !== "undefined")
    (window as any).localStorage.setItem(`accessToken:${hash()}`, accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  if (typeof window !== "undefined")
    (window as any).localStorage.setItem(
      `refreshToken:${hash()}`,
      refreshToken
    );
};

export const cleanoutOldVersions = () => {
  if (typeof window !== "undefined") {
    let itemsToRemove: string[] = [];
    let hashValue = hash();
    for (var i = 0, len = (window as any).localStorage.length; i < len; ++i) {
      let nextItem = (window as any).localStorage.key(i);
      if (nextItem && !nextItem?.endsWith(`:${hashValue}`)) {
        itemsToRemove.push(nextItem);
      }
    }

    // console.log('cleanoutOldVersions itemsToRemove', itemsToRemove)
    itemsToRemove.forEach((item) => {
      (window as any).localStorage.removeItem(item);
    });
  }
};

export const deleteTokens = () => {
  if (typeof window !== "undefined") {
    (window as any).localStorage.removeItem(`refreshToken:${hash()}`);

    (window as any).localStorage.removeItem(`accessToken:${hash()}`);
  }
};
