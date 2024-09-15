import { useEffect, useMemo, useState } from 'react';

export function useColorScheme() {

  const [isDark, setIsDark] = useState<boolean>();

  const value = useMemo(() => isDark === undefined ? '' : isDark,
    [isDark])

  useEffect(() => {
    // if (value) {
    //   document.body.classList.add('dark');
    // } else {
    //   document.body.classList.remove('dark');
    // }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}