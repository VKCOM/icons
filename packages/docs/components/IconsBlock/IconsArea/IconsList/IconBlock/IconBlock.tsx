import { Caption, classNames } from '@vkontakte/vkui';
import styles from './IconBlock.module.css';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  getRootRef?: React.Ref<HTMLDivElement>;
  Icon: React.ElementType;
  active?: boolean;
}

export function IconBlock({ getRootRef, Icon, active, className, children, ...props }: IconProps) {
  return (
    <div
      ref={getRootRef}
      className={classNames(className, styles.host, active && styles.active)}
      {...props}
    >
      <Icon />
      <Caption level="2" normalize={false} className={styles.text}>
        {children}
      </Caption>
    </div>
  );
}
