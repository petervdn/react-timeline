import { FullGestureState } from '@use-gesture/react';
import { NumberBounds, TimeRange } from '../types';

export const getLocalMousePositionByWheelState = (
  state: FullGestureState<'wheel'>,
  element: HTMLElement
) => {
  const rect = element.getBoundingClientRect();

  return {
    x: (state.event as any)?.clientX - rect.left, // todo fix these typings
    y: (state.event as any)?.clientY - rect.top,
  };
};

export const getTimeForPosition = (
  positionX: number,
  viewRange: TimeRange,
  timePerPixel: number
) => viewRange.start + positionX * timePerPixel;

export const getDurationForTimeRange = (range: TimeRange) =>
  range.end - range.start;

export const getTimePerPixel = (viewRange: TimeRange, widthInPixels: number) =>
  (viewRange.end - viewRange.start) / widthInPixels;

export const clampNumber = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const getZoomFactor = (
  timeRange: TimeRange,
  durationBounds: NumberBounds
) => {
  const duration = getDurationForTimeRange(timeRange);
  return (
    (duration - durationBounds.min) / (durationBounds.max - durationBounds.min)
  );
};

/**
 * Generates a new timeRange by giving a new duration.
 * The current timeRange is needed to keep the zoomCenter
 * in exactly the same place in the new timeWindow.
 * @param currentTimeRange
 * @param newTimeRangeDuration
 * @param zoomCenterTime
 */
export const getNewTimeWindowForDuration = (
  currentTimeRange: TimeRange,
  newTimeRangeDuration: number,
  zoomCenterTime: number
): TimeRange => {
  // check position of zoomCenter, so we can keep that in place (should be value between 0 and 1)
  const zoomCenterPositionFactor =
    (zoomCenterTime - currentTimeRange.start) /
    (currentTimeRange.end - currentTimeRange.start);

  // distribute the new duration (with the correct amounts) to the left and right side of the zoomCenter
  return {
    start: zoomCenterTime - newTimeRangeDuration * zoomCenterPositionFactor,
    end: zoomCenterTime + newTimeRangeDuration * (1 - zoomCenterPositionFactor),
  };
};

export const getNewTimeRangeForZoomFactor = (
  currentTimeRange: TimeRange,
  zoomFactor: number,
  durationBounds: NumberBounds,
  centerTime: number
) => {
  const clampedZoomFactor = clampNumber(zoomFactor, 0, 1);
  const newTimeWindowDuration =
    durationBounds.min +
    (durationBounds.max - durationBounds.min) * clampedZoomFactor;

  return getNewTimeWindowForDuration(
    currentTimeRange,
    newTimeWindowDuration,
    centerTime
  );
};
