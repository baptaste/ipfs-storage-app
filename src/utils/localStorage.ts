const prefix: string = 'web3_storage_';

export const localStorage = {
  get: (key: string) => JSON.parse(window.localStorage.getItem(`${prefix}${key}`) as string),
  set: (key: string, data: any) => {
    window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(data));
  },
  clear: (key: string) => {
    window.localStorage.removeItem(`${prefix}${key}`);
  },
  clearAll: () => {
    for (const key in window.localStorage) {
      if (key.startsWith(prefix)) {
        window.localStorage.removeItem(key);
      }
    }
  },
};
