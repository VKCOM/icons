import * as React from 'react';
import * as allIcons from '@vkontakte/icons';
import { useSignal } from 'use-signals';
import { IconBlock } from './IconBlock/IconBlock';
import * as signals from '../../signals';
import * as computed from './computed';
import styles from './IconsList.module.css';

interface IconProps {
  componentName: string;
  filename: string;
}

function Icon({ filename, componentName }: IconProps) {
  const selectedIcon = useSignal(signals.selected);
  const isActive = filename === selectedIcon.filename;

  const Component = allIcons[componentName];

  return (
    <IconBlock
      Icon={Component}
      active={isActive}
      onMouseDown={() => {
        signals.selected.set({
          filename,
          componentName,
          Component,
        });
      }}
    >
      {filename}
    </IconBlock>
  );
}

function IconsList() {
  const elements = useSignal(computed.elements);
  const color = useSignal(signals.color);

  const ref = React.useRef<HTMLDivElement>(null);

  const maxRealRenderElements = 6 * 10;

  const [cursor, setCursor] = React.useState(0);

  const lengthElements = elements.length;

  const calcCursor = () => {
    const el = ref.current;

    /**
     * Считаем высоту отрендереных элементов
     */
    const renderElementsHeight = el.scrollHeight;
    const oneElementHeight = renderElementsHeight / lengthElements;

    const newCursor = Math.min(
      Math.floor(el.scrollTop / oneElementHeight / (maxRealRenderElements / 2)) *
        (maxRealRenderElements / 2),
      lengthElements - maxRealRenderElements,
    );

    setCursor(newCursor);
  };

  React.useEffect(calcCursor, [elements]);

  return (
    <div
      ref={ref}
      className={styles.host}
      onScroll={calcCursor}
      style={{ color: color || 'var(--vkui--color_icon_secondary)' }}
    >
      {elements.map(({ filename, componentName }, index) => {
        if (index < cursor || index > cursor + maxRealRenderElements) {
          return <div key={componentName} className={styles.fakeElement} />;
        }

        return <Icon key={componentName} filename={filename} componentName={componentName} />;
      })}
    </div>
  );
}

export default IconsList;
