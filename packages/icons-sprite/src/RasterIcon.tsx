import { Ref, ImgHTMLAttributes, FC } from 'react';
import { useAppearance } from '@vkontakte/vkui';

type DensityBucketType = 'mdpi' | 'hdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';
type DensityBucketSet = {
  [key in DensityBucketType]?: string;
};

interface RasterIconBaseProps extends ImgHTMLAttributes<HTMLImageElement> {
  getRootRef?: Ref<HTMLImageElement>;
}

type RasterIconInternalProps = DensityBucketSet & {
  id: string;
  size: number;
};

type RasterIconProps = RasterIconInternalProps & RasterIconBaseProps;

const dppxModifiersMap: Record<DensityBucketType, number> = {
  mdpi: 1,
  hdpi: 1.5,
  xhdpi: 2,
  xxhdpi: 3,
  xxxhdpi: 4,
};

const densityBucketTypes = Object.keys(dppxModifiersMap);

const RasterIcon = ({ getRootRef, id, size, className, ...restProps }: RasterIconProps) => {
  const srcSet = densityBucketTypes
    .reduce<string[]>((srcSet, densityBucket) => {
      const src = restProps[densityBucket];

      if (src) {
        delete restProps[densityBucket];
      }

      srcSet.push(`${src} ${dppxModifiersMap[densityBucket]}dppx`);

      return srcSet;
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
        className,
      ]
        .join(' ')
        .trim()}
      width={size}
      height={size}
      srcSet={srcSet}
      loading="lazy"
      draggable={false}
    />
  );
};

export function makeRasterIcon<Props extends RasterIconBaseProps>(
  componentName: string,
  id: string,
  size: number,
  mdpi: string,
  hdpi: string,
  xhdpi: string,
  xxhdpi: string,
  xxxhdpi: string,
): FC<Props> {
  const Icon = (props: Props) => {
    return (
      <RasterIcon
        id={id}
        size={size}
        mdpi={mdpi}
        hdpi={hdpi}
        xhdpi={xhdpi}
        xxhdpi={xxhdpi}
        xxxhdpi={xxxhdpi}
        {...props}
      />
    );
  };

  Icon.displayName = componentName;

  return Icon;
}
