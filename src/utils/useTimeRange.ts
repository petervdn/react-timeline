import { useState } from 'react';
import {
  getDurationForTimeRange,
  getTimePerPixel,
  getZoomFactor,
} from './utils';
import { NumberBounds, Size, TimeRange } from '../types';

export const useTimeRange = (
  maxTimeRange: TimeRange,
  minDuration: number,
  size: Size
) => {
  const [timeRange, setTimeRange] = useState(maxTimeRange);
  const timePerPixel = getTimePerPixel(timeRange, size.width);
  const durationBounds: NumberBounds = {
    min: minDuration,
    max: getDurationForTimeRange(maxTimeRange),
  };
  const zoomFactor = getZoomFactor(timeRange, durationBounds);

  return {
    timeRange,
    setTimeRange,
    timePerPixel,
    zoomFactor,
    durationBounds,
  };
};
