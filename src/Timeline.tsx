import { Size, TimelineItemData, Range } from './types';
import { TimelineViewport } from './TimelineViewport';
import { useState } from 'react';

type Props = {
  size: Size;
  items: Array<TimelineItemData>;
  itemHeight: number;
  maxRange: Range;
  minViewDuration: number;
  zoom: number;
};

export const Timeline = ({
  size,
  items,
  maxRange,
  minViewDuration,
  itemHeight,
  zoom,
}: Props) => {
  const maxViewDuration = maxRange.end - maxRange.start;
  const [centerTime] = useState(0.5 * maxViewDuration);

  const viewDuration =
    minViewDuration + zoom * (maxViewDuration - minViewDuration);

  const viewRange = {
    start: centerTime - 0.5 * viewDuration,
    end: centerTime + 0.5 * viewDuration,
  };
  // console.log(maxViewDuration, viewDuration);

  return (
    <>
      <h1>
        Timeline {size.width},{size.height}
      </h1>
      <TimelineViewport
        size={size}
        viewRange={viewRange}
        items={items}
        itemHeight={itemHeight}
      />
    </>
  );
};
