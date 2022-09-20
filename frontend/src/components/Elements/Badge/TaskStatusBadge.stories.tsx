import { Meta, Story } from '@storybook/react';

import { TaskStatusBadge, TaskStatusBadgeProps } from './TaskStatusBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/TaskStatusBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<TaskStatusBadgeProps> = (props) => <TaskStatusBadge {...props} />;

export const Todo = Template.bind({});
Todo.args = {
  status: 'todo',
};

export const InProgress = Template.bind({});
InProgress.args = {
  status: 'inprogress',
};

export const InReview = Template.bind({});
InReview.args = {
  status: 'inReview',
};
export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
};
