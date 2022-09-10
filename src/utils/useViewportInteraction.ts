import { useGesture } from '@use-gesture/react';
import {
  getLocalMousePositionByWheelState,
  getNewTimeRangeForZoomFactor,
  getTimeForPosition,
} from './utils';
import { useRef } from 'react';
import { NumberBounds, TimeRange } from '../types';

type Props = {
  timePerPixel: number;
  zoomFactor: number;
  durationBounds: NumberBounds;
  setTimeRange: (range: TimeRange) => void;
  timeRange: TimeRange;
};

export const useViewportInteraction = ({
  durationBounds,
  setTimeRange,
  timePerPixel,
  zoomFactor,
  timeRange,
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useGesture(
    {
      onWheel: state => {
        const mousePosition = getLocalMousePositionByWheelState(
          state,
          elementRef.current as HTMLDivElement
        );
        //
        const time = getTimeForPosition(
          mousePosition.x,
          timeRange,
          timePerPixel
        );

        const newZoomFactor =
          zoomFactor + 0.08 * zoomFactor * state.direction[1];

        const newTimeRange = getNewTimeRangeForZoomFactor(
          timeRange,
          newZoomFactor,
          durationBounds,
          time
        );
        setTimeRange(newTimeRange);
      },
    },
    { target: elementRef }
  );

  return elementRef;
};
