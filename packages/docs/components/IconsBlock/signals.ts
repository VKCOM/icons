import { Icon12Add } from '@vkontakte/icons';
import { Signal } from 'use-signals';

export const selected = new Signal.State({
  filename: 'add_12',
  componentName: 'Icon12Add',
  Component: Icon12Add,
});

export const search = new Signal.State('');
export const size = new Signal.State(undefined);
export const color = new Signal.State('');

export const langs = new Signal.State({
  panel: {
    search: {
      placeholder: 'Поиск иконок',
      clearLabel: 'Очистить',
    },
    size: {
      placeholder: 'Размер',
    },
    color: {
      label: 'Цвет иконки',
    },
  },
  sidebar: {
    react: {
      label: 'Название компонента в React',
      copy: 'Копировать',
    },
    buttons: {
      save_as_svg: 'Сохранить SVG',
      copy_as_svg: 'Копировать SVG',
    },
  },
});
