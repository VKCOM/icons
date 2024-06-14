import { Color } from './Color/Color';
import styles from './Palette.module.css';

const COLORS = [
  '#0A0A0A',
  '#FFFFFF',
  '#A3ADB8',
  '#FF3347',
  '#F05C44',
  '#FFA000',
  '#FFC062',
  '#E3FE3E',
  '#93FF0A',
  '#4BB34B',
  '#01A612',
  '#06EEFD',
  '#529EF4',
  '#3F8AE0',
  '#4249FF',
  '#9985FF',
  '#A94FFF',
  '#7545FF',
  '#F097FF',
  '#F060C0',
];

export function Palette() {
  return (
    <div className={styles.host}>
      {COLORS.map((value) => (
        <Color key={value}>{value}</Color>
      ))}
    </div>
  );
}
