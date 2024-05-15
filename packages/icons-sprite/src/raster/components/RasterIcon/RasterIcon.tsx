import React from 'react';
import {
  appearanceTypes,
  useIconAppearance,
} from '../IconAppearanceProvider/IconAppearanceProvider';
import type { DensityBucketAppearanceSet, DensityBucketType } from './types';
import { getDensityBucketAppearanceKey } from './utils/getDensityBucketAppearanceKey';

interface RasterIconBaseProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  getRootRef?: React.Ref<HTMLImageElement>;
}

interface RasterIconInternalProps extends DensityBucketAppearanceSet {
  id: string;
  size: number;
}

type RasterIconProps = RasterIconInternalProps & RasterIconBaseProps;

// https://developer.android.com/training/multiscreen/screendensities#TaskProvideAltBmp
const dppxModifiersMap: Record<DensityBucketType, number> = {
  mdpi: 1,
  hdpi: 1.5,
  // Должно быть 2, но так как мы пропускаем при генерации hdpi, понижаем это значение.
  // Считаем избыточным генерацию hdpi, xhdpi в использовании для hdpi не сильно шакалится.
  xhdpi: 1.5,
  xxhdpi: 3,
  xxxhdpi: 4,
};

const densityBucketTypes = Object.keys(dppxModifiersMap) as DensityBucketType[];

const RasterIcon = React.memo(function RasterIcon({
  getRootRef,
  id,
  size,
  className,
  ...restProps
}: RasterIconProps) {
  const appearance = useIconAppearance();

  const srcSet = densityBucketTypes
    .reduce<string[]>((set, densityBucket) => {
      const densityAppearanceKey = getDensityBucketAppearanceKey(appearance, densityBucket);
      let src = restProps[densityAppearanceKey];
      delete restProps[densityAppearanceKey];

      for (const appearance of appearanceTypes) {
        const densityAppearanceKey = getDensityBucketAppearanceKey(appearance, densityBucket);
        if (!src) {
          src = restProps[densityAppearanceKey];
        }

        delete restProps[densityAppearanceKey];
      }

      if (src) {
        set.push(`${src} ${dppxModifiersMap[densityBucket]}x`);
      }

      return set;
    }, [])
    .join(', ');

  return (
    <img
      ref={getRootRef}
      aria-hidden="true"
      alt=""
      className={[
        'vkuiIcon',
        `vkuiIcon--${size}`,
        `vkuiIcon--w-${size}`,
        `vkuiIcon--h-${size}`,
        `vkuiIcon--${id}`,
        'vkuiRasterIcon',
        className,
      ]
        .join(' ')
        .trim()}
      width={size}
      height={size}
      srcSet={srcSet}
      loading="lazy"
      draggable={false}
      {...restProps}
    />
  );
});

export function makeRasterIcon<Props extends RasterIconBaseProps>(
  componentName: string,
  id: string,
  size: number,
  densityBucketAppearanceSet: DensityBucketAppearanceSet,
): React.FC<Props> {
  const Icon = (props: Props): JSX.Element => {
    return <RasterIcon id={id} size={size} {...densityBucketAppearanceSet} {...props} />;
  };

  Icon.size = size;
  Icon.isRasterIcon = true;
  Icon.displayName = componentName;

  return Icon;
}
