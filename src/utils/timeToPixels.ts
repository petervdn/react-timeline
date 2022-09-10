import { Range } from '../types';

export const timeToPixels = (
  time: number,
  viewTimeRange: Range,
  viewWidth: number
) => {
  return (
    ((time - viewTimeRange.start) / (viewTimeRange.end - viewTimeRange.start)) *
    viewWidth
  );
};
