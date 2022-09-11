import { Size, TimelineItemData, TimeRange } from './types';
import React, { useState } from 'react';
import { timeToPixels } from './utils/timeToPixels';
import { TimelineItem } from './TimelineItem';

type Props = {
  size: Size;
  timeRange: TimeRange;
  items: Array<TimelineItemData>;
  itemHeight: number;
};

export const TimelineViewport = React.forwardRef<HTMLDivElement, Props>(
  ({ size, items, timeRange, itemHeight }, ref) => {
    const [canvasContext, setCanvasContext] =
      useState<CanvasRenderingContext2D>();

    return (
      <div>
        <div
          ref={ref}
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
  }
);
