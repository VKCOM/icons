import { IconAppearance } from '../../IconAppearanceProvider/IconAppearanceProvider';
import type { DensityBucketAppearanceType, DensityBucketType } from '../types';

export const getDensityBucketAppearanceKey = (
  appearanceType: IconAppearance,
  densityBucket: DensityBucketType,
): DensityBucketAppearanceType => `${appearanceType}${densityBucket}`;
