import * as React from 'react';
import { AdaptivityProvider, CustomSelect, Input, Popover, Search } from '@vkontakte/vkui';
import { Palette } from './Palette/Palette';
import { Signal, useSignal } from 'use-signals';
import { useLangs } from '../hooks';
import * as signals from '../signals';
import styles from './Panel.module.css';

export function useSignalValue(signal: Signal.State<string>) {
  const value = useSignal(signal);

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    signal.set(event.target.value);
  };

  return [value, onChange] as const;
}

function SearchIcons() {
  const langs = useLangs();

  const [search, onChangeSearch] = useSignalValue(signals.search);

  return (
    <AdaptivityProvider sizeY="regular">
      <Search
        className={styles.search}
        noPadding
        aria-label={langs.panel.search.placeholder}
        placeholder={langs.panel.search.placeholder}
        value={search}
        onChange={onChangeSearch}
        clearLabel={langs.panel.search.clearLabel}
      />
    </AdaptivityProvider>
  );
}

const SIZES = [12, 16, 20, 24, 28, 32, 34, 36, 40, 44, 48, 56, 96];

function SelectSize() {
  const langs = useLangs();

  const [size, onChangeSize] = useSignalValue(signals.size);

  return (
    <AdaptivityProvider sizeY="compact">
      <CustomSelect
        aria-label={langs.panel.size.placeholder}
        placeholder={langs.panel.size.placeholder}
        options={[
          {
            label: 'Не задан',
            value: '',
          },
          ...SIZES.map((value) => ({
            label: value.toString(),
            value: value.toString(),
          })),
        ]}
        dropdownOffsetDistance={12}
        value={size}
        onChange={onChangeSize}
        /**
         * FIXME(VKUI): Хак для работы опции "Не задан"
         */
        allowClearButton
        ClearButton={() => <div />}
      />
    </AdaptivityProvider>
  );
}

function InputColor() {
  const langs = useLangs();

  const [color, onChangeColor] = useSignalValue(signals.color);

  return (
    <AdaptivityProvider sizeY="compact">
      <Popover
        trigger="hover"
        role="dialog"
        aria-describedby="color-choose"
        usePortal={false}
        arrow
        content={() => <Palette />}
      >
        <Input
          id="color-choose"
          aria-label={langs.panel.color.label}
          placeholder="#FFFFFF"
          value={color}
          align="center"
          onChange={onChangeColor}
        />
      </Popover>
    </AdaptivityProvider>
  );
}

export function Panel() {
  return (
    <div className={styles.host}>
      <SearchIcons />
      <SelectSize />
      <InputColor />
    </div>
  );
}
