import iconsMap from '@vkontakte/icons/dist/icons-map.json';
import { Signal } from 'use-signals';
import levenshtein from 'js-levenshtein';
import * as signals from '../../signals';

export const elements = new Signal.Computed(() => {
  const search = signals.search.get();
  const size = signals.size.get();

  if (!search && !size) {
    return iconsMap;
  }

  let icons = iconsMap;

  if (size) {
    icons = icons.filter(({ size: iconSize }) => iconSize === size);
  }

  if (search) {
    let searchIcons = icons.filter(({ filename }) => filename.indexOf(search) > -1);

    /**
     * Если ничего не найдено, пытаемся искать с помощью расстояния Левенштейна
     */
    if (!searchIcons.length) {
      searchIcons = icons.filter(({ filename }) => {
        for (const name of filename.split('_')) {
          if (levenshtein(search, name) < 3) {
            return true;
          }
        }

        return false;
      });
    }

    icons = searchIcons;
  }

  return icons;
});
