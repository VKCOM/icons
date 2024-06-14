import * as React from 'react';
import {
  Button,
  ButtonGroup,
  Div,
  FormItem,
  IconButton,
  Input,
  Separator,
  Spacing,
} from '@vkontakte/vkui';
import { Icon16CopyOutline, Icon24CopyOutline, Icon24DownloadOutline } from '@vkontakte/icons';
import { copyTextToClipboard } from '@vkontakte/vkjs';
import { useSignal } from 'use-signals';
import { useLangs } from '../hooks';
import { DisplayTitle } from '../../../vkui-nextra-theme/components/DisplayTitle/DisplayTitle';
import * as signals from '../signals';
import styles from './Sidebar.module.css';

const svgMimeType = 'image/svg+xml';

function getSVGString(name: string): string {
  return document
    .getElementById(name)
    .outerHTML.replace(/^<symbol/, '<svg')
    .replace(/<\/symbol>$/, '</svg>');
}

function Buttons({ iconName }: { iconName: string }) {
  const langs = useLangs();

  /**
   * Двойной рендер нужен для поддержки SSR
   */
  const [urlDownload, setURLDownload] = React.useState('');

  React.useEffect(() => {
    const data = getSVGString(iconName);

    const blob = new Blob([data], { type: svgMimeType });

    setURLDownload(window.URL.createObjectURL(blob));
  }, [iconName]);

  const copySVG = () => {
    const data = getSVGString(iconName);

    copyTextToClipboard(data).then(() => console.log('Иконка скопирована как текст')); // TODO: Сделать отдачу
  };

  return (
    <ButtonGroup mode="vertical" stretched>
      <Button
        size="l"
        mode="secondary"
        before={<Icon24DownloadOutline />}
        stretched
        href={urlDownload}
        download={iconName + '.svg'}
        loading={!urlDownload}
      >
        {langs.sidebar.buttons.save_as_svg}
      </Button>
      <Button size="l" mode="secondary" before={<Icon24CopyOutline />} stretched onClick={copySVG}>
        {langs.sidebar.buttons.copy_as_svg}
      </Button>
    </ButtonGroup>
  );
}

export function Sidebar() {
  const selectedIcon = useSignal(signals.selected);
  const Icon = selectedIcon.Component;

  return (
    <div className={styles.host}>
      <Div className={styles.preview}>
        <Icon width={192} height={192} />
        <DisplayTitle level="4" weight="3">
          {selectedIcon.filename}
        </DisplayTitle>
      </Div>
      <Separator />
      <Spacing size={4} />

      <ReactTab />

      <div className={styles.flexStretch} />

      <Div>
        <Buttons iconName={selectedIcon.filename} />
      </Div>
    </div>
  );
}
function ReactTab() {
  const langs = useLangs();
  const selectedIcon = useSignal(signals.selected);

  const copyReactName = () =>
    copyTextToClipboard(selectedIcon.componentName).then(() =>
      console.log('Название компонента в React скопировано'),
    ); // TODO: Сделать отдачу;

  return (
    <FormItem top={langs.sidebar.react.label}>
      <Input
        readOnly
        type="text"
        value={selectedIcon.componentName}
        after={
          <IconButton hoverMode="opacity" label={langs.sidebar.react.copy} onClick={copyReactName}>
            <Icon16CopyOutline />
          </IconButton>
        }
      />
    </FormItem>
  );
}
