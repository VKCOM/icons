import { classNames } from '@vkontakte/vkui';
import { useSignal } from 'use-signals';
import * as signals from '../../../signals';

import styles from './Color.module.css';

export interface ColorProps {
  children: string;
}

export function Color({ children }: ColorProps) {
  const actualColor = useSignal(signals.color);

  const onClick = () => signals.color.set(children);

  return (
    <div
      className={classNames(styles.host, actualColor === children && styles.active)}
      style={{ background: children }}
      onMouseDown={onClick}
    ></div>
  );
}
