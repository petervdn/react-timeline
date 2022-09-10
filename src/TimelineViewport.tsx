import { Range, Size, TimelineItemData } from './types';
import { useState } from 'react';
import { timeToPixels } from './utils/timeToPixels';
import { TimelineItem } from './TimelineItem';

type Props = {
  size: Size;
  viewRange: Range;
  items: Array<TimelineItemData>;
  itemHeight: number;
};

export const TimelineViewport = ({
  size,
  items,
  viewRange,
  itemHeight,
}: Props) => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();

  return (
    <div>
      <div
        style={{
          width: size.width,
          height: size.height,
          backgroundColor: 'darkkhaki',
          position: 'relative',
        }}
      >
        {items.map((item, index) => {
          const start = timeToPixels(item.time.start, viewRange, size.width);
          const end = timeToPixels(item.time.end, viewRange, size.width);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: start,
                top: 0,
                width: end - start,
                border: '1px solid black',
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
