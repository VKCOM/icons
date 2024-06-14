import * as React from 'react';
import { IconButton } from '@vkontakte/vkui';
import { Icon24CopyOutline } from '@vkontakte/icons';
import { copyTextToClipboard } from '@vkontakte/vkjs';
import styles from './Pre.module.css';

export const Pre = ({ children, ...props }: React.ComponentProps<'pre'>) => {
  const preRef = React.useRef<HTMLPreElement | null>(null);

  const copyCode = () => {
    const data = preRef.current?.querySelector('code')?.textContent || '';

    copyTextToClipboard(data);
  };

  return (
    <div className={styles.host}>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <div className={styles.buttons}>
        <IconButton label="Копировать" onClick={copyCode}>
          <Icon24CopyOutline />
        </IconButton>
      </div>
    </div>
  );
};
