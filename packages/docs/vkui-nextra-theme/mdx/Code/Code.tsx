import { JetBrains_Mono } from 'next/font/google';
import { classNames } from '@vkontakte/vkjs';
import styles from './Code.module.css';

const monoFont = JetBrains_Mono({
  subsets: ['cyrillic'],
});

export function Code({ className, ...props }: React.ComponentProps<'code'>) {
  return <code className={classNames(className, monoFont.className, styles.host)} {...props} />;
}
