'use client';

import * as React from 'react';
import { SegmentedControl, Skeleton } from '@vkontakte/vkui';
import { Icon20MoonOutline, Icon20SunOutline } from '@vkontakte/icons';
import styles from './ThemeSelect.module.css';

const LIGHT_CLASS_NAME = 'vkui--vkBase--light';
const DARK_CLASS_NAME = 'vkui--vkBase--dark';

function removeAppearanceClassNames() {
  document.documentElement.classList.remove(LIGHT_CLASS_NAME, DARK_CLASS_NAME);
}

function matchMediaListAddListener(
  mediaQueryList: MediaQueryList,
  listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
) {
  mediaQueryList.addEventListener
    ? mediaQueryList.addEventListener('change', listener)
    : mediaQueryList.addListener(listener);
}

function matchMediaListRemoveListener(
  mediaQueryList: MediaQueryList,
  listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
) {
  mediaQueryList.removeEventListener
    ? mediaQueryList.removeEventListener('change', listener)
    : mediaQueryList.removeListener(listener);
}

export function ThemeSelect() {
  const [appearance, setAppearance] = React.useState<undefined | 'light' | 'dark'>(undefined);
  const autoAppearance = React.useRef(true);

  const onClick = () => {
    autoAppearance.current = false;

    const newAppearance = appearance === 'light' ? 'dark' : 'light';

    setAppearance(newAppearance);

    const appearanceClassName = newAppearance === 'dark' ? DARK_CLASS_NAME : LIGHT_CLASS_NAME;

    removeAppearanceClassNames();
    document.documentElement.classList.add(appearanceClassName);
  };

  React.useEffect(() => {
    const mediaQuery = window ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;

    if (!mediaQuery) {
      return () => {};
    }

    const check = (event: MediaQueryList | MediaQueryListEvent) => {
      removeAppearanceClassNames();
      setAppearance(event.matches ? 'dark' : 'light');
    };
    check(mediaQuery);
    matchMediaListAddListener(mediaQuery, check);
    return () => matchMediaListRemoveListener(mediaQuery, check);
  }, []);

  if (appearance === undefined) {
    return <Skeleton className={styles.host} />;
  }

  return (
    <SegmentedControl
      className={styles.host}
      value={appearance}
      options={[
        {
          'label': <Icon20SunOutline />,
          'value': 'light',
          'aria-label': 'Светлая тема',
          onClick,
        },
        {
          'label': <Icon20MoonOutline />,
          'value': 'dark',
          'aria-label': 'Темная тема',
          onClick,
        },
      ]}
    />
  );
}
