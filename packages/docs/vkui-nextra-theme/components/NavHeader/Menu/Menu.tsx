import { Chip } from './Chip/Chip';
import styles from './Menu.module.css';

const data = [
  {
    href: 'https://vkcom.github.io/VKUI/',
    children: 'Компоненты',
  },
  {
    href: 'https://vkcom.github.io/icons/',
    children: 'Иконки',
  },
  {
    href: 'https://vkcom.github.io/vkui-tokens/',
    children: 'Токены',
  },
];

interface MenuPage {
  href: string;
  children: string;
}

export interface MenuProps {
  pages: Array<MenuPage>;
  selectedHref: string;
}

export function Menu({ pages, selectedHref }: MenuProps) {
  return (
    <nav className={styles.host}>
      {pages.map((props, i) => (
        <Chip key={i} active={selectedHref === props.href} {...props} />
      ))}
    </nav>
  );
}
