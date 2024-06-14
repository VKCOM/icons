import { Button, ButtonGroup, classNames } from '@vkontakte/vkui';
import { Icon20GitHub } from '../../icons/Icon20GitHub';
import styles from './HeaderBanner.module.css';
import { Icon20Figma } from '../../icons/Icon20Figma';

function labelFromHref(href: string) {
  switch (true) {
    case /github\.com\/[\w\d-]+\/[\w\d-]+\/issues/.test(href):
      return 'Issues';
    case /github\.com\/[\w\d-]+\/[\w\d-]+/.test(href):
      return 'Source';
    case /figma\.com/.test(href):
      return 'Figma';
  }
}

function typeFromHref(href: string): 'github' | 'figma' {
  switch (true) {
    case /github\.com/.test(href):
      return 'github';
    case /figma\.com/.test(href):
      return 'figma';
  }
}

function beforeFromType(type?: 'github' | 'figma' | 'storybook') {
  return {
    github: <Icon20GitHub />,
    figma: <Icon20Figma />,
    storybook: <Icon20GitHub />,
  }[type];
}

export interface HeaderBannerLinksProps {
  children: Array<{
    type?: 'github' | 'figma' | 'storybook';
    href: string;
    label?: string;
    before?: React.ReactNode;
  }>;
}

export function Links({ children }: HeaderBannerLinksProps) {
  return (
    <ButtonGroup gap="s" className={styles.buttons}>
      {children.map(({ href, label, before, type }, i) => {
        return (
          <Button
            key={i}
            appearance="accent"
            mode="secondary"
            size="m"
            href={href}
            target="_blank"
            before={before || beforeFromType(type || typeFromHref(href))}
            style={{ lineHeight: 0 }} // FIXME(VKUI): check this
          >
            {label || labelFromHref(href)}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}

export function HeaderBanner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames(className, styles.host, 'vkui--vkBase--dark')} {...props} />;
}

HeaderBanner.Links = Links;
