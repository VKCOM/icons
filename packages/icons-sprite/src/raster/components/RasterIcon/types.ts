import type { IconAppearance } from '../IconAppearanceProvider/IconAppearanceProvider';

export type DensityBucketType = 'mdpi' | 'hdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';

export type DensityBucketAppearanceType = `${IconAppearance}${DensityBucketType}`;

export type DensityBucketSet = {
  [key in DensityBucketType]?: string;
};

export type DensityBucketAppearanceSet = {
  [key in DensityBucketAppearanceType]?: string;
};
