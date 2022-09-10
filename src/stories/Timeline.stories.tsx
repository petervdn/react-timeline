import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Timeline } from '../Timeline';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Timeline',
  component: Timeline,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    zoom: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
} as ComponentMeta<typeof Timeline>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Timeline> = args => (
  <Timeline {...args} />
);

export const Test = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Test.args = {
  size: { width: 800, height: 100 },
  itemHeight: 20,
  items: [
    { time: { start: 200, end: 300 } },
    { time: { start: 500, end: 900 } },
    { time: { start: 910, end: 980 } },
  ],
  maxTimeRange: { start: 100, end: 1000 },
  zoom: 1,
  minViewDuration: 10,
};
