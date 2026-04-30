import { useState, useEffect } from 'react';
import { i18n } from '../i18n';
import { useLanguageStore } from '../../store/languageStore';

export function useTranslation() {
  const languageKey = useLanguageStore((state) => state.languageKey);
  const [, setUpdate] = useState(0);

  useEffect(() => {
    setUpdate(n => n + 1);
  }, [languageKey]);

  const t = (key: string) => {
    return i18n.t(key);
  };

  return { t, languageKey };
}

export default useTranslation;