import { create } from 'zustand';
import { i18n, getDeviceLanguage } from '../src/i18n';

type LanguageStore = {
  currentLanguage: string;
  languageKey: number;
  setLanguage: (code: string) => void;
  getCurrentLanguage: () => string;
  forceUpdate: () => void;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  currentLanguage: getDeviceLanguage(),
  languageKey: 0,

  setLanguage: (code: string) => {
    i18n.locale = code;
    set({ currentLanguage: code, languageKey: get().languageKey + 1 });
  },

  getCurrentLanguage: () => {
    return get().currentLanguage;
  },

  forceUpdate: () => {
    set({ languageKey: get().languageKey + 1 });
  },
}));