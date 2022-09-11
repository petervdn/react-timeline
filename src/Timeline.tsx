import { Size, TimelineItemData, TimeRange } from './types';
import { TimelineViewport } from './TimelineViewport';

import { useViewportInteraction } from './utils/useViewportInteraction';
import { useTimeRange } from './utils/useTimeRange';

type Props = {
  viewportSize: Size;
  items: Array<TimelineItemData>;
  itemHeight: number;
  maxTimeRange: TimeRange;
  minViewDuration: number;
  zoom: number;
};

export const Timeline = ({
  viewportSize,
  items,
  maxTimeRange,
  itemHeight,
  minViewDuration,
}: Props) => {
  const timeRangeProps = useTimeRange(
    maxTimeRange,
    minViewDuration,
    viewportSize.width
  );
  const elementRef = useViewportInteraction(timeRangeProps);

  const { timeRange, zoomFactor } = timeRangeProps;

  return (
    <>
      <h1>
        Timeline {timeRange.start.toFixed(2)}-{timeRange.end.toFixed(2)}
        (zoom: {zoomFactor.toFixed(5)})
      </h1>
      <TimelineViewport
        ref={elementRef}
        size={viewportSize}
        timeRange={timeRange}
        items={items}
        itemHeight={itemHeight}
      />
    </>
  );
};
