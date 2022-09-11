import { NumberBounds, Size, TimelineItemData, TimeRange } from './types';
import { TimelineViewport } from './TimelineViewport';
import { useState } from 'react';
import {
  getDurationForTimeRange,
  getTimePerPixel,
  getZoomFactor,
} from './utils/utils';

type Props = {
  size: Size;
  items: Array<TimelineItemData>;
  itemHeight: number;
  maxTimeRange: TimeRange;
  minViewDuration: number;
  zoom: number;
};

export const Timeline = ({
  size,
  items,
  maxTimeRange,
  itemHeight,
  minViewDuration,
}: Props) => {
  const [timeRange, _setTimeRange] = useState(maxTimeRange);
  const timePerPixel = getTimePerPixel(timeRange, size.width);
  const durationBounds: NumberBounds = {
    min: minViewDuration,
    max: getDurationForTimeRange(maxTimeRange),
  };
  const zoomFactor = getZoomFactor(timeRange, durationBounds);

  const setTimeRange = (range: TimeRange) => {
    _setTimeRange(range);
  };

  return (
    <>
      <h1>
        Timeline {timeRange.start.toFixed(2)}-{timeRange.end.toFixed(2)} (zoom:{' '}
        {zoomFactor.toFixed(5)})
      </h1>
      <TimelineViewport
        size={size}
        timeRange={timeRange}
        items={items}
        itemHeight={itemHeight}
        timePerPixel={timePerPixel}
        zoomFactor={zoomFactor}
        durationBounds={durationBounds}
        setTimeRange={setTimeRange}
      />
    </>
  );
};
