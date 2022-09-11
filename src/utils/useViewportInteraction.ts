import { useGesture } from '@use-gesture/react';
import {
  getLocalMousePositionByWheelState,
  getNewTimeRangeForZoomFactor,
  getTimeForPosition,
} from './utils';
import { useRef } from 'react';
import { useTimeRange } from './useTimeRange';

type Props = ReturnType<typeof useTimeRange>;

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

        const newZoomFactor = zoomFactor + 0.008 * state.direction[1];

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
