import { NumberBounds, Size, TimelineItemData, TimeRange } from './types';
import { useState } from 'react';
import { timeToPixels } from './utils/timeToPixels';
import { TimelineItem } from './TimelineItem';
import { useViewportInteraction } from './utils/useViewportInteraction';

type Props = {
  size: Size;
  timeRange: TimeRange;
  items: Array<TimelineItemData>;
  itemHeight: number;
  timePerPixel: number;
  zoomFactor: number;
  durationBounds: NumberBounds;
  setTimeRange: (range: TimeRange) => void;
};

export const TimelineViewport = ({
  size,
  items,
  timeRange,
  itemHeight,
  timePerPixel,
  zoomFactor,
  durationBounds,
  setTimeRange,
}: Props) => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();

  const elementRef = useViewportInteraction({
    timeRange,
    timePerPixel,
    zoomFactor,
    setTimeRange,
    durationBounds,
  });

  return (
    <div>
      <div
        ref={elementRef}
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: 'darkkhaki',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => {
          const start = timeToPixels(item.time.start, timeRange, size.width);
          const end = timeToPixels(item.time.end, timeRange, size.width);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: start,
                top: 0,
                width: end - start,
                backgroundColor: 'white',
                height: itemHeight,
              }}
            >
              <TimelineItem label="item" />
            </div>
          );
        })}
      </div>
      <canvas
        ref={canvas => {
          const context = canvas?.getContext('2d');
          if (context) {
            setCanvasContext(context);
          }
        }}
        width={size.width}
        height={size.height}
      />
    </div>
  );
};
