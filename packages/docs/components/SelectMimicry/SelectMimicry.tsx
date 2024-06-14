import { Icon24ChevronDown } from '@vkontakte/icons';
import { FormField, classNames } from '@vkontakte/vkui';
import styles from './SelectMimicry.module.css';

interface SelectMimicryProps extends React.ComponentProps<typeof FormField> {}

/**
 * FIXME(VKUI): import from vkui
 */
export function SelectMimicry({ children, after, className, ...props }: SelectMimicryProps) {
  return (
    <FormField
      Component="a"
      after={
        <>
          {after}
          <Icon24ChevronDown />
        </>
      }
      className={classNames(className, styles.host)}
      {...props}
    >
      <span className={styles.text}>{children}</span>
    </FormField>
  );
}
